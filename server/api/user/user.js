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
  setResponseForbidden,
} from "../../utils/response.util.js";
import { logFoundRecords } from "../../utils/logger.util.js";
import { UPLOAD_IMAGE_FOLDER } from "../../constants/image.const.js";
import { dateTimeToString } from "../../utils/datetime.util.js";
import fs from "fs";
import { changeFileName } from "../../utils/picture.util.js";
import { ROLE_ADMIN, ROLE_FARMER, ROLE_HEAD_CE, USERS_STATUS_ENABLE } from "../../constants/table.const.js";

import { createRefreshTokenService } from "../../utils/jwt.util.js";
import { get_search_value, manage_user_detail_format } from "../../utils/user.util.js";
import { Console, log } from "console";


// /**
//  * @param {Request} req HTTP request argument to the middleware function.
//  */
// export async function registerService(data) {
//   try {

//     const dataHash = hashData(data.password); 
//     //การนำ password ใน fucntion HashData โดยจะรับ paramiter 1 ตัว แล้วจะ Return Object กลับมา 2 ตัว
//     //{salt: salt,hashData: ข้อมูลที่ทำการ Hash,}
//     const userInfo = {
//       username: data.username,
//       password: dataHash.hashData,
//       salt:   dataHash.salt,
//     };

//     const queryCheckInfo = `select * from USERS where username = ?`;
//     const [queryResult, fields] = await conn.query(queryCheckInfo, [
//       userInfo.username
//     ]);
//     if (queryResult.length > 0) {
//       return setResponseDuplicate("username นี้ถูกใช้แล้ว");
//     }

//     const user_role = data.user_role.join(',');
//     const queryInsert = `INSERT INTO USERS (username, password, salt, user_role) VALUES (?,?,?,?)`;
//     const insertUser = await conn.execute(queryInsert, [
//       userInfo.username,
//       userInfo.password,
//       userInfo.salt,
//       user_role
//     ]);


//     // if(data.user_role == ROLE_FARMER){
//     //   const queryFarmer = 'insert IGNORE into USER_ROLE(username, roleid) values (?, ?)'
//     //   const [fresult, ffield] = await conn.query(queryFarmer, [data.username, ROLE_FARMER]);
//     // }

//     console.log(insertUser[0].affectedRows);
    
//     return insertUser[0].affectedRows == 1 ?
//         setResponseSuccess(`Register user successfully! : ${userInfo.username}`):
//         setResponseError(`Can NOT regist user : ${userInfo.username}`);
//   } catch (error) {
//     return setResponseError(error);
//   }
// }


// /**
//  * @param {Request} req HTTP request argument to the middleware function.
//  */

// export async function loginService(data) {
//   try {

//     const queryCheckInfo = `select password, salt from USERS where username = ?`;

//     const [queryResult, fields] = await conn.query(queryCheckInfo, [
//       data.username,
//     ]);

//     if (queryResult.length == 0) {
//       return setResponseNotFound("ไม่พบผู้ใช้นี้อยู่ในระบบ");
//     }
//     const checkPassword = deCodeHashData(
//       queryResult[0].password,
//       queryResult[0].salt,
//       data.password
//     );
//     if (!checkPassword) 
//       return setResponseError("รหัสผ่านไม่ถูกต้อง");
//     else
//       return setResponseSuccess("Login successfully");
    

//   } catch (error) {
//     return setResponseError(error)
//   }
// }




/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertOrUpdateUserDetailService(data) {
  try {
    console.log('insertOrUpdateUserDetailService');

    const queryCheckUser = `select password, salt, user_role, user_status, star_farmer from USERS where username = ?`;
    const [checkResult] = await conn.query(queryCheckUser,[data.username]);


    if(checkResult.length == 0){
      return setResponseError(`No user found : ${data.username}`);
    }

    const checkPassword = deCodeHashData(
      checkResult[0].password,
      checkResult[0].salt,
      data.password
    );


    if(!checkPassword){
      return setResponseError(`Wrong password`);
    }

    // ---- กันการตั้ง role / star_farmer ให้ตัวเอง ----
    // role 1, 2 (ทั่วไป, เกษตรกร) เปลี่ยนเองได้
    // role ตั้งแต่ 3 ขึ้นไป ต้องมีอยู่แล้ว (admin เป็นคนให้ผ่าน /admin/users/user_detail หรือ register_staff + approve)
    const current_roles = String(checkResult[0].user_role ?? '').split(',').filter(r => r !== '').map(Number);
    const is_enabled    = checkResult[0].user_status == USERS_STATUS_ENABLE;
    const is_admin      = is_enabled && current_roles.includes(ROLE_ADMIN);
    const is_staff      = is_enabled && current_roles.some(r => r >= ROLE_HEAD_CE);

    const requested_roles = Array.isArray(data.user_role) ? data.user_role.map(Number) : current_roles;
    const new_elevated    = requested_roles.filter(r => r >= ROLE_HEAD_CE && !current_roles.includes(r));
    if (!is_admin && new_elevated.length > 0) {
      return setResponseForbidden(`ไม่สามารถเพิ่ม role ${new_elevated.join(',')} ให้ตัวเองได้ ต้องให้ admin เป็นผู้กำหนด`);
    }
    const user_role = requested_roles.join(',');

    // star_farmer ต้องให้ผู้นำ/เจ้าหน้าที่เป็นคนตั้ง (เส้น /user/star_farmer)
    if (!is_staff) data.star_farmer = checkResult[0].star_farmer;

    const query = `insert into USERS  
      ( username,    title,        name,         surname,      email,  
        idcard,     gender,       birthday,     address_code, houseid,  
        moo,        village,      road,         subdistrict,  district, 
        province,   post,         phone,        info,         user_role,
        user_type,  education,  position,       company,      star_farmer,  
        consent,    family_member)
    VALUES(?,?,?,?,?,  ?,?,?,?,?,  ?,?,?,?,?,   ?,?,?,?,?,   ?,?,?,?,?, ?,?)
    on DUPLICATE KEY UPDATE
      title       = ?,    
      name        = ?,
      surname     = ?,
      email       = ?,

      idcard      = ?,
      gender      = ?,
      birthday    = ?,
      address_code = ?,
      houseid     = ?,

      moo         = ?,        
      village     = ?,
      road        = ?,
      subdistrict = ?,
      district    = ?,

      province    = ?,
      post        = ?,
      phone       = ?,
      info        = ?,
      user_role   = ?,
      
      user_type   = ?,
      education   = ?,
      position    = ?,
      company     = ?,
      star_farmer = ?,

      consent     = ?,
      family_member = ?
      `;
    

    const [results] = await conn.query(query, [
      data.username,  data.title,       data.name,      data.surname,       data.email,      
      data.idcard,    data.gender,      data.birthday,  data.address_code,  data.houseid,   
      data.moo,       data.village,     data.road,      data.subdistrict,   data.district,  
      data.province,  data.post,        data.phone,     data.info,          user_role,
      data.user_type, data.education,   data.position,  data.company,       data.star_farmer,    
      data.consent,   data.family_member,

                      data.title,       data.name,      data.surname,       data.email,      
      data.idcard,    data.gender,      data.birthday,  data.address_code,  data.houseid,   
      data.moo,       data.village,     data.road,      data.subdistrict,   data.district,  
      data.province,  data.post,        data.phone,     data.info,          user_role,
      data.user_type, data.education,   data.position,  data.company,       data.star_farmer,    
      data.consent,   data.family_member
    ]);

    // console.log(data);

    // update detail เสร็จแล้ว ต้องสร้าง token ใหม่ เพราะ address_code เปลี่ยน
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
      username:         data.username,
      refreshToken:     refreshToken
  };
    // console.log(result.refreshToken);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่พบ USERS : ${data.username}`):
      setResponseSuccess(result);

  } catch (error) {
    return setResponseError(error);
  }
   
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updateStarFarmerService(data) {
  try {
    console.log('updateStarFarmerService');

    const search_value = get_search_value(data.search_username, data.username);
   
    const update_query = `UPDATE USERS set star_farmer = ? where username = ?`;
    const [result, field] = await conn.execute(
      update_query, [data.star, search_value]);

    return setResponseSuccess(`Update star_farmer successfully ${search_value} : ${data.star}`);
  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {JSON} data  argument from front
 */
export async function updateUserConsentService(data) {
  try {
    console.log('updateUserConsentService');
   
    const update_query = `UPDATE USERS set consent = ? where username = ?`;
    const [result, field] = await conn.execute(
      update_query, [data.consent, data.username]);

    return setResponseSuccess(`Update user consent successfully`);
  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertOrUpdateUserPictureService(data) {
  try {
    console.log('insertOrUpdateUserPictureService');
   
    const update_query = `UPDATE USERS set picture = ? where username = ?`;
    const [update_image, update_image_field] = await conn.execute(
      update_query,
      [data.filepath, data.username]
    );

    return setResponseSuccess(`${data.filepath}`);
  } catch (error) {
    return setResponseError(error);
  }
}



// /**
//  * @param {Request} req HTTP request argument to the middleware function.
//  */
// export async function resetPasswordService(data) {
//   try {

//     const dataHash = hashData(data.new_password); 
    
//     const userInfo = {
//       username: data.username,
//       password: dataHash.hashData,
//       salt:     dataHash.salt,
//     };


//     const query = `UPDATE USERS set password = ?, salt = ? where username = ?`;
//     const [results,fields] = await conn.execute(query, [
//       userInfo.password,
//       userInfo.salt,
//       userInfo.username
//     ]);

//     return (results.affectedRows==0)?
//       setResponseNotFound(`No username : ${userInfo.username}`) :
//       setResponseSuccess(`Update password successfully! : ${userInfo.username}`);
//   } catch (error) {
//     return setResponseError(error);
//   }
// }


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectUserDetailService(data) {
  try {
    console.log('selectUserDetailService');

    const search_value = get_search_value(data.search_username, data.username);

    const query = `select * from USERS where username = ?`; 

    const [results] = await conn.query(query, [
      search_value
    ]);
    
    if(results.length != 0)
      manage_user_detail_format(results[0])
    
    logFoundRecords(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ USERS : ${search_value}`):
      setResponseSuccess(results[0]);

  } catch (error) {
    return setResponseError(error);
  }
   
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectHeadCommunityEnterpriseService(data) {
  try { //ดูว่า username นี้เป็นหัวหน้า  community enterprise ใดบ้าง
    console.log('selectHeadCommunityEnterpriseService');

    const search_value = get_search_value(data.search_username, data.username);

    const query = `select * from COMMUNITY_ENTERPRISE where head_user = ?`; 
    const [results] = await conn.query(query, [search_value]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ HEAD_COMMUNITY_ENTERPRISE : ${search_value}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectHeadCommunityService(data) {
  try {   //ดูว่า username นี้เป็นหัวหน้า  community ใดบ้าง
    console.log('selectHeadCommunityService');
    const search_value = get_search_value(data.search_username, data.username);

    const query = `select * from COMMUNITY where head_user = ?`; 
    const [results] = await conn.query(query, [search_value]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ HEAD_COMMUNITY : ${search_value}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectCommunityEnterpriseService(data) {
  try {//ดูว่า username นี้เป็น สมาชิก community enterprise ใดบ้าง
    console.log('selectCommunityEnterpriseService');
    const search_value = get_search_value(data.search_username, data.username);
    const query = `
                  SELECT  COMMUNITY_ENTERPRISE.ce_id, COMMUNITY_ENTERPRISE.ce_name, start_date
                  FROM	  COMMUNITY_ENTERPRISE, COMMUNITY_ENTERPRISE_MEMBER
                  WHERE	  COMMUNITY_ENTERPRISE.ce_id	= COMMUNITY_ENTERPRISE_MEMBER.ce_id
                  AND		  username = ?`; 
    const [results] = await conn.query(query, [
      search_value
    ]);
    
    logFoundRecords(results);
    // return setResponseSuccess(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ COMMUNITY_ENTERPRISE ของ user นี้: ${search_value}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectCommunityService(data) {
  try {
    //ดูว่า username นี้เป็น สมาชิก community  ใดบ้าง
    console.log('selectCommunityService');
    const search_value = get_search_value(data.search_username, data.username);

    const query = `
          SELECT  COMMUNITY.community_id, COMMUNITY.community_name, start_date
          FROM	  COMMUNITY, COMMUNITY_MEMBER
          WHERE	  COMMUNITY.community_id	= COMMUNITY_MEMBER.community_id
          AND		  username = ?`; 
    const [results, user_fields] = await conn.query(query, [
      search_value
    ]);
    
    logFoundRecords(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ COMMUNITY ของ user นี้: ${search_value}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteUserService(data) {
  try {

    console.log("deleteUserService");

    const query = `delete from USERS where username = ?`;

    const [results, user_fields] = await conn.query(query, [
      data.delete_username
    ]);

    return results.affectedRows==0 ?
        setResponseError(`ไม่สามารถ delete USERS: ${data.delete_username}`) :
        setResponseSuccess(`Deleted! username:  ${data.delete_username}`);
  } catch (error) {
    return setResponseError(error)
  }
}

