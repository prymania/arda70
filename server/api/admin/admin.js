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
import { logFoundRecords } from "../../utils/logger.util.js";
import { UPLOAD_IMAGE_FOLDER } from "../../constants/image.const.js";
import { dateTimeToString } from "../../utils/datetime.util.js";
import fs from "fs";
import { changeFileName } from "../../utils/picture.util.js";
import { ROLE_FARMER } from "../../constants/table.const.js";

import { createRefreshTokenService } from "../../utils/jwt.util.js";
import { get_search_column, get_search_value, manage_user_detail_format } from "../../utils/user.util.js";
import { log } from "console";

import mysql from 'mysql2/promise';

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectAllRolesService() {
  try {

    console.log("selectAllRolesService");

    const query = `select * from ROLE`;

    const [results] = await conn.query(query);

    logFoundRecords(results);

    return setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error)
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectAllUsersService(data) {
  try {
    console.log('selectAllUsersService');

    const query = `select * from USERS`;

    let [results] = await conn.query(query);

    results = results.map(user => manage_user_detail_format(user));  //remove password, salt และแปลง user_role เป็น array

    logFoundRecords(results);

    return setResponseSuccess(results);


  } catch (error) {
    return setResponseError(error);
  }

}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function searchUserDetailService(data) {
  try {
    console.log('searchUserDetailService');
    console.log(data);
    
    const result = get_search_column(data);

    let query = "", column = "", search_value = "";

    if(result && Array.isArray(result)){  //เช็คว่า search by columnn อะไร
      [column, search_value] = result;
      // ค้นหา role ด้วย like แต่ต้องส่งค่าผ่าน ? เสมอ (ของเดิมต่อ string ตรง ๆ ทำให้โดน SQL injection ได้)
      if (column == 'user_role') search_value = `%${search_value}%`;
      query = (column == 'user_role') ? `select * from USERS where ${mysql.escapeId(column)} like ? order by address_code` :
                                  `select * from USERS where ${mysql.escapeId(column)} = ?`;
    }
    else{
      query = `select * from USERS`;
    }
 
    console.log(column, search_value);
    console.log(query);

    let [results] = await conn.query(query, [search_value
    ]);

    if (results.length != 0){
      results = results.map(user => manage_user_detail_format(user));  //remove password, salt และแปลง user_role เป็น array
    }

    logFoundRecords(results);

    return (results.length == 0) ?
      setResponseNotFound(`ไม่พบ USERS (${column}) : ${search_value}`) :
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }

}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function waitForApproveUserDetailService(data) {
  try {
    console.log('waitForApproveUserDetailService');
    
    const query = `select * from USERS where user_status = 0`;    // status disable อยู่่

    let [results] = await conn.query(query, [query
    ]);

    if (results.length != 0){
      results = results.map(user => manage_user_detail_format(user));  //remove password, salt และแปลง user_role เป็น array
    }

    logFoundRecords(results);

    return (results.length == 0) ?
      setResponseNotFound(`ไม่พบ USERS รอ approve`) :
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }

}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertOrUpdateUserDetailService(data) {
  try {
    console.log('insertOrUpdateUserDetailService');

    const user_role = data.user_role.join(',');

    const query = `
    update USERS set
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
      where username = ?
      `;
    

    const [results] = await conn.query(query, [
                      data.title,       data.name,      data.surname,       data.email,      
      data.idcard,    data.gender,      data.birthday,  data.address_code,  data.houseid,   
      data.moo,       data.village,     data.road,      data.subdistrict,   data.district,  
      data.province,  data.post,        data.phone,     data.info,          user_role,
      data.user_type, data.education,   data.position,  data.company,       data.star_farmer,    
      data.consent,   data.family_member, data.search_username
    ]);

    console.log(results);
    
    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่พบ USERS : ${data.search_username}`):
      setResponseSuccess(`Update USERS detail successfully -username: ${data.search_username}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function changePasswordService(data) {
  try {

    const hashedPassword = hashData(data.new_password); 
    const userInfo = {
      search_username:     data.search_username,
      new_password: hashedPassword.hashedPassword,
      salt:         hashedPassword.salt,
    };

    const query = `UPDATE USERS set password = ?, salt = ? where username = ?`
    const insertUser = conn.execute(query, [
      userInfo.new_password,
      userInfo.salt,
      userInfo.search_username
    ]);

    console.log(`USER: ${userInfo.search_username} chanage password successfully : `);
    return setResponseSuccess(`USER: ${userInfo.search_username} chanage password successfully : `);
  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function approveUserService(data) {
  try {

    const query = `UPDATE USERS set user_status = 1 where username = ?`
    console.log(data);
    
    const results = await conn.execute(query, [
      data.username
    ]);

    return (results[0].affectedRows==0) ? 
        setResponseNotFound(`ไม่พบ USERS : ${data.username}`):
        setResponseSuccess(`USER: ${data.username} update status successfully : `);

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

    return results.affectedRows == 0 ?
      setResponseError(`ไม่สามารถ delete USERS: ${data.delete_username}`) :
      setResponseSuccess(`Deleted! username:  ${data.delete_username}`);
  } catch (error) {
    return setResponseError(error)
  }
}


/*************************************************** */
/** CONFIG_SYSTEM ********************************** */
/*************************************************** */
/*************************************************** */


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertConfigSystemService(data) {
  try {
    console.log("insertConfigSystemService");
    const query = `insert into CONFIG_SYSTEM values (?, ?)`;
    const [results] = await conn.query(query, [ data.keyid, data.value]);
    return setResponseSuccess(`Insert successfully  ${data.keyid}, ${data.value}`);
  } catch (error) {
    return setResponseError(error)
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteConfigSystemService(data) {
  try {
    console.log("deleteConfigSystemService");
    const query = `delete from CONFIG_SYSTEM where keyid = ?`;
    const [results] = await conn.query(query, [data.keyid]);
    // return setResponseSuccess(`delete successfully  ${data.keyid}`);
    return results.affectedRows == 0 ?
      setResponseError(`ไม่สามารถ delete CONFIG_SYSTEM: ${data.keyid}`) :
      setResponseSuccess(`delete successfully  ${data.keyid}`);

  } catch (error) {
    return setResponseError(error)
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updateConfigSystemService(data) {
  try {
    console.log("updateConfigSystemService");
    const query = `update CONFIG_SYSTEM 
                   set    value = ?
                   where  keyid = ?`;
    const [results] = await conn.query(query, [data.value, data.keyid]);
    return setResponseSuccess(`update successfully  ${data.keyid}, ${data.value}`);
  } catch (error) {
    return setResponseError(error)
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectConfigSystemService(data) {
  try {
    console.log("selectConfigSystemService");
    const search_value =  (data.keyid !== undefined) ? data.keyid : 
                          (data.value !== undefined) ? data.value  : "";

    const query = (data.keyid !== undefined) ?  ` select * from CONFIG_SYSTEM where keyid = ?` :
                  (data.value !== undefined) ?  ` select * from CONFIG_SYSTEM where value = ?` :
                                                ` select * from CONFIG_SYSTEM`

    const [results] = await conn.query(query, [search_value]);
    return setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error)
  }
}

