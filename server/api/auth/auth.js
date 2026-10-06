import { conn } from "../../configs/db.config.js";
import {
  deCodeHashData,
  generateUuid,
  hashData,
} from "../../utils/command.util.js";

import {
  setResponseDuplicate,
  setResponseError,
  setResponseNotFound,
  setResponseSuccess,
} from "../../utils/response.util.js";

import {
  createRefreshTokenService,
  createToken,
  getTokenExpiredDate,

} from "../../utils/jwt.util.js";
import { STATE } from "../../constants/status.const.js";

import dotenv from "dotenv";
import {  JWT_SECRET_TOKEN, JWT_SECRET_TOKEN_EXPIRES } from "../../constants/config.const.js";
import { DEFAULT_ADDRESS_CODE, USERS_STATUS_DISABLE, USERS_STATUS_ENABLE } from "../../constants/table.const.js";
import { manage_user_detail_format } from "../../utils/user.util.js";
import { isAboveSubdistrictRole } from "../../utils/user_role.util.js";

dotenv.config();

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function registerService(data) {
  try {

    const hashedPassword = hashData(data.password); 

    const userInfo = {
      username: data.username,
      password: hashedPassword.hashedPassword,
      salt:     hashedPassword.salt,
    };

    const query = `select * from USERS where username = ?`;
    const [queryResult] = await conn.query(query, [userInfo.username]);



    if (queryResult.length > 0) {
      if (queryResult[0].username === userInfo.username) {
        return setResponseDuplicate("username นี้ถูกใช้แล้ว");
      } 
    }


    //ถ้า user_role 1, 2 ประชาชัน เกษตรกร ให้ user_status = 1 (enable) เลย ถ้า 3 ขึ้นไปต้อง disable ก่อนแล้วให้ admin approve
    const user_role = data.user_role.join(',');

    const isApprovedNeeded =  isAboveSubdistrictRole(data.user_role); // role 3 ขึ้นไปต้องให้ admin approve
    var user_status = USERS_STATUS_ENABLE;
    if(isApprovedNeeded)
      user_status = USERS_STATUS_DISABLE;
    
    
    const queryInsert = `INSERT INTO USERS(username, password, salt, user_role, user_status) VALUES (?, ?, ?, ?, ?)`;
    await conn.execute(queryInsert, [
                              userInfo.username,
                              userInfo.password,
                              userInfo.salt,
                              user_role,
                              user_status
                            ]);

    // generate token and store in database, this token doesn't have address_code yet
    
    const login_uuid = generateUuid();
    const login_data = {
      ip:                 data.ip,
      device:             data.device,
      login_uuid:         login_uuid,
      username:           data.username,
      address_code:       DEFAULT_ADDRESS_CODE  
    }


    const refreshToken = await createRefreshTokenService(login_data);

    const result = { 
        username:     userInfo.username,
        refreshToken: refreshToken
    };

    return setResponseSuccess(result);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function registerStaffService(data) {
  try {

    const hashedPassword = hashData(data.password); 

    const userInfo = {
      username: data.username,
      password: hashedPassword.hashedPassword,
      salt:     hashedPassword.salt,
    };

    const query = `select * from USERS where username = ?`;
    const [queryResult] = await conn.query(query, [userInfo.username]);



    if (queryResult.length > 0) {
      if (queryResult[0].username === userInfo.username) {
        return setResponseDuplicate("username นี้ถูกใช้แล้ว");
      } 
    }


    //ถ้า user_role 1, 2 ประชาชัน เกษตรกร ให้ user_status = 1 (enable) เลย ถ้า 3 ขึ้นไปต้อง disable ก่อนแล้วให้ admin approve
    const user_role = data.user_role.join(',');

    const isApprovedNeeded =  isAboveSubdistrictRole(data.user_role); // role 3 ขึ้นไปต้องให้ admin approve
    var user_status = USERS_STATUS_ENABLE;
    if(isApprovedNeeded)
      user_status = USERS_STATUS_DISABLE;
    

    const queryInsert = `INSERT INTO USERS(
                    username, password, salt,           user_role,      user_status,
                    title,    name,     surname,        email,          idcard,
                    gender,   birthday, address_code,   subdistrict,    district,   
                    province, post,     phone,           info,           position,   
                    company,  consent
                    
                    ) 
                    VALUES (?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?,
                            ?, ?
                    )`;
    await conn.execute(queryInsert, [
                userInfo.username,  userInfo.password,    userInfo.salt,     user_role,         user_status,
                data.title,         data.name,            data.surname,       data.email,       data.idcard,    
                data.gender,        data.birthday,        data.address_code,  data.subdistrict,   data.district,  
                data.province,      data.post,            data.phone,         data.info,          data.position,  
                data.company,       data.consent
                            ]);

    // generate token and store in database, with given address_code
    
    const login_uuid = generateUuid();
    const login_data = {
      ip:                 data.ip,
      device:             data.device,
      login_uuid:         login_uuid,
      username:           data.username,
      address_code:       data.address_code  
    }


    const refreshToken = await createRefreshTokenService(login_data);

    const result = { 
        username:     userInfo.username,
        refreshToken: refreshToken
    };

    return setResponseSuccess(result);
  } catch (error) {
    return setResponseError(error);
  }
}


export async function loginService(data) {
  try {

    //เอา address_code ไปด้วย เพื่อไปสร้าง token
    const query1 = `select  password, salt, address_code 
                    from    USERS 
                    where   username = ? 
                    and     user_status = 1`;         //check enabled_user ด้วย

    const [result1] = await conn.query(query1, [data.username]);
    
    if (result1.length == 0) { return setResponseNotFound("ไม่พบผู้ใช้นี้อยู่ในระบบ หรือ admin ยังไม่ได้ approve"); }
    
    const user_info = result1[0];
    
    const checkPassword = deCodeHashData( user_info.password, user_info.salt, data.password);

    if (!checkPassword) { return setResponseError("รหัสผ่านไม่ถูกต้อง"); }

    //สร้าง token เอาข้อมูลที่ต้องการใส่ใน token, insert table LOGINS, ACCESS_TOKENS
    const login_uuid = generateUuid();

    const login_data = {
      ip:                 data.ip,
      device:             data.device,
      login_uuid:         login_uuid,
      username:           data.username,
      address_code:       user_info.address_code
    }
    
    const refreshToken = await createRefreshTokenService(login_data);

    const query = `select * from USERS where username = ?`; // return ข้อมูลที่อยากได้ อาจต้อง ต่อ  roleid จาก table อื่น ๆ

    const [results] = await conn.query(query, [data.username]);

    manage_user_detail_format(results[0]);
    const result = { 
      refreshToken: refreshToken,
      user_detail_results: results[0]
    };  

    // work on user_login_counting
    const query_counting = `insert into USERS_LOGIN_COUNT (username, amount) values (?, 1)
                            ON DUPLICATE KEY 
                            UPDATE amount = amount + 1`;
    const [results_counting] = await conn.query(query_counting, [data.username]);
 
    return setResponseSuccess(result);

  } catch (error) {
    return setResponseError(error)
  }
}
/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function logoutService(data) {
  try {
    
    const result = await findUsernameService(data.username);

    if (!result.state == STATE.SUCCESS) {
      return setResponseError("ไม่มีข้อมูลผู้ใช้ กรุณาทำรายการใหม่อีกรอบ");
    }
    const queryCheckInfo = `UPDATE LOGINS
    SET   login_enable_flag   = false, 
          login_updated_date  = ? 
    WHERE login_uuid          = ?;`;

    const [queryResult] = await conn.query(queryCheckInfo, [new Date(Date.now()), data.login_uuid, ]);
    return setResponseSuccess("Logout Success");
  } catch (error) {
    return setResponseError(error);
  }
}

export async function findUsernameService(username) {
  const queryCheckInfo = `select username from USERS where username=?`;
  const [queryResult, fields] = await conn.query(queryCheckInfo, [username]);

  queryResult.state = (queryResult.length==0)? STATE.FAILED : STATE.SUCCESS
  return queryResult.state;
}
///ตรวจสอบ login_uuid เพื่อหาว่า Jwt(Access Token, Refresh Token) 2 อันที่ได้มาจาก authentication.middleware.js มีใน table logins หรือเปล่า
export async function findlogin_uuidService(login_uuid) {

  const queryCheckInfo = `
          select  username, login_uuid 
          from    LOGINS 
          where   login_uuid        = ? 
          and     login_enable_flag = true`;
  const [queryResult] = await conn.query(queryCheckInfo, [login_uuid]);

  const state = (queryResult.length==0)? STATE.FAILED : STATE.SUCCESS

  return state;
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function changePasswordService(data) {
  try {

    const hashedPassword = hashData(data.new_password); 
    const userInfo = {
      username:     data.username,
      new_password: hashedPassword.hashedPassword,
      salt:         hashedPassword.salt,
    };

    const query = `UPDATE USERS set password = ?, salt = ? where username = ?`
    const results = await conn.execute(query, [
      userInfo.new_password,
      userInfo.salt,
      userInfo.username
    ]);

    // อาจจะไม่ต้องสร้าง token ใหม่ แถวนี้นะ ดูอีกที
    // pry  ต้อง retoken ใหม่ตรงนี้ด้วยวะ เพราะมันเหมือน
    // pry ไม่ต้องสร้างก็ได้แหละ คิดว่านะ ก็เปลี่ยนพาสแล้วก็ใช้ token เดิมเลย ไม่เป็นไร

    // const login_uuid = generateUuid();
    // const device = { ip: "ip เครื่อง", hostname: "hostname" };
    // const refreshToken = await createRefreshTokenService(
    //   device,
    //   login_uuid,
    //   userInfo.uuid
    // );
    // const access_token = await createAccessTokenService(login_uuid);
    // const result = { 
    //   uuid:        userInfo.uuid,
    //   access_token: access_token, 
    //   refreshToken: refreshToken };

    console.log(results[0]);

    return (results[0].affectedRows==0) ? 
    setResponseNotFound(`ไม่พบ USERS : ${data.username}`):
    setResponseSuccess(`USER: ${userInfo.username} chanage password successfully : `);

    
    // return setResponseSuccess(`USER: ${userInfo.username} chanage password successfully : `);
  } catch (error) {
    return setResponseError(error);
  }
}

