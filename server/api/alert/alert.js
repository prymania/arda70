import { conn } from "../../configs/db.config.js";
import {
  deCodeHashData,
  hashData,
} from "../../utils/command.util.js";
import {
  setResponseDuplicate,
  setResponseError,
  setResponseNotFound,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { logFoundRecords } from "../../utils/logger.util.js";
import { changeFileName, deletePictureFile } from "../../utils/picture.util.js";
import { response } from "express";
import { ALERT_ANNOUNCEMENT_ID, ROLE_DISTRICT_OFFICER } from "../../constants/table.const.js";
import { get_district_address_code } from "../../utils/address_code.util.js";
import { manage_role_array } from "../../utils/user.util.js";


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertAlertService(data) {
  try {
    console.log('insertAlertService');

    const detail = (data.detail==null)? '':data.detail;

    const announcement = (data.announcement == ALERT_ANNOUNCEMENT_ID) ?
                          ALERT_ANNOUNCEMENT_ID : 0;

    const query = `insert into ALERT(username, alert_enddate, alert_type, detail, picture, announcement)
                    values (?,?,?,?,?,?)`;

    const [results, user_fields] = await conn.query(query, [
      data.username,  data.alert_enddate, data.alert_type,  detail,  data.filepath, announcement]);
      // data.username,  data.alert_enddate, data.alert_type,  detail,  filepath, announcement]);

      console.log(data);
    
      //เช็คว่า response_to != null แสดงว่า เป็นการตอบกลับจากเกษตรอำเภอ ดังนั้นจะต้อง update เอา alert_id ที่เพิ่งได้ ไป update ลง id ตาม response_to ด้วย
      if(data.response_to != null){
        console.log(`update response_id as ${results.insertId}`);
        // ต้องทำเยอะแยะ ใช้ .join(',') เลยไม่ได้ เพราะส่งเป็น query params แล้วมันเป็นแบบนี้
        var temp = data.response_to.replace(/'/g,'"');
        temp = temp.replace(new RegExp('\\[', 'g'), '');
        temp = temp.replace(new RegExp('\\]', 'g'), '');
 
        const alert_id_list = temp.split(',').map(Number);

        const update_query = `update ALERT set response_id = ? where alert_id IN (?)`;
        const [update_result, update_fields] = await conn.query(update_query, [results.insertId, alert_id_list]);
        console.log("Amount of row updated : ", update_result.affectedRows);

      }
      return (results.affectedRows==0) ? 
          setResponseNotFound(`ไม่สามารถเพิ่ม Alert ได้( username) :${data.username}`):
          setResponseSuccess(`insert Alert successfully`);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updateAlertService(data) {
  try {
    console.log('updatAlertService');

    const detail = (data.detail==null)? '':data.detail;

    console.log(data);
    const query = `
        update  ALERT 
        set     
                alert_enddate   = ?
                ,alert_type     = ?
                ,detail         = ?
                ,announcement   = ?
                ,picture        = ?
        where   alert_id        = ?`;

    const [results, user_fields] = await conn.query(query, [
      data.alert_enddate,  data.alert_type,  detail,  data.announcement, data.filepath, data.alert_id]);

      return (results.affectedRows==0) ? 
          setResponseNotFound(`ไม่สามารถ edit Alert ได้( alert_id) :${data.alert_id}`):
          setResponseSuccess(`edit Alert successfully alert_id : ${data.alert_id}`);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectAlertService(data) {
  try {
    console.log('selectAlertService');

    const query = `select * from ALERT where username = ? order by alert_id DESC`;

    let [results] = await conn.query(query, [data.username]);
    logFoundRecords(results)
    
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล Alert of username  : ${data.username}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectAnnouncementAlertService(data) {
  try {
    console.log('selectAnnouncementAlertService');
    
    // อันนี้คือส่ง address_code from JWT
    const user_district_address_code = get_district_address_code(data.address_code);
    console.log(user_district_address_code);
    const query = 
    `select ALERT.* , concat(USERS.name, ' ', USERS.surname) as officer_name, USERS.user_role as officer_role
    from    ALERT, USERS
    WHERE   ALERT.username  = USERS.username
    and     USERS.user_role  like '%?%'
    AND     announcement    = ?
    and     alert_enddate   >= CURRENT_DATE()
    AND     substring(USERS.address_code,1,4) = ?
    order by alert_id desc`;
    const [results, fields] = await conn.query(query, [ROLE_DISTRICT_OFFICER, ALERT_ANNOUNCEMENT_ID, user_district_address_code]);

    // prymania:  codeเดิม ต้องjoin แบบนี้ถ้าไม่ส่ง address_code  มาทาง header นะ
    // const query = 
    // `select ALERT.* , concat(USERS.name, ' ', USERS.surname) as officer_name, USERS.user_role as officer_role
    // from    ALERT, USERS
    // WHERE   ALERT.username  = USERS.username
    // and     USERS.user_role  like '%?%'
    // AND     announcement    = ?
    // and     alert_enddate   >= CURRENT_DATE()
    // AND     substring(USERS.address_code,1,4) = 
    //            (select substring(address_code, 1, 4)
    //             from    USERS
    //             where   username = ?)
    // order by alert_id desc`;
    // const [results, fields] = await conn.query(query, [ROLE_DISTRICT_OFFICER, ALERT_ANNOUNCEMENT_ID, data.username]);
    
  
    manage_role_array(results, 'officer_role');
    console.log(results);
    logFoundRecords(results)
    
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล Announment จากอำเภอของ user  : ${data.username}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectResponseAlertService(data) {
  try {
    console.log('selectResponseAlertService');

    const query = 
    `select A2.*, concat(USERS.name, ' ', USERS.surname) as officer_name, USERS.user_role as officer_role
    from 	  ALERT A1, ALERT A2, USERS
    where 	A1.response_id	= A2.alert_id  
    and     A2.username 	  = USERS.username
    and     A1.alert_id      = ?`;

    const [results] = await conn.query(query, [data.alert_id]);

    manage_role_array(results, 'officer_role');
    logFoundRecords(results)
    
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล response ของ alert_id  : ${data.alert_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectAlertOfficerService(data) {
  try {
    console.log('selectAlertOfficerService');
    

    // prymania:  นี่คือ code ถ้าส่ง address_code มาทาง headers
    const user_district_address_code = get_district_address_code(data.address_code);
    console.log(user_district_address_code);
    const query = 
    `select ALERT.* , concat(USERS.name, ' ', USERS.surname) as farmer_name, USERS.subdistrict
    from		ALERT, USERS
    where   ALERT.username  = USERS.username
    and		  announcement 	  != ?
    and			ALERT.username 	!= ?
    and			ALERT.username IN 
            (select username
            from	  USERS
            where 	substring(address_code, 1, 4) = ?)
    order by response_id ASC, subdistrict ASC, alert_id DESC
    `;
    const [results, fields] = await conn.query(query, [ALERT_ANNOUNCEMENT_ID, data.username, user_district_address_code]);

    //prymania แบบไม่ส่ง address_code (JWT) มา เช็คจาก username
    // const query = `select ALERT.* , concat(USERS.name, ' ', USERS.surname) as farmer_name, USERS.subdistrict
    // from		ALERT, USERS
    // where   ALERT.username  = USERS.username
    // and		  announcement 	  != ?
    // and			ALERT.username 	!= ?
    // and			ALERT.username IN 
    //         (select username
    //         from	  USERS
    //         where 	substring(address_code,1,4) =
    //                 (select substring(address_code,1,4)
    //                 from	  USERS
    //                 where	  username = ?))
    // order by response_id ASC, alert_id DESC`;
    // const [results, fields] = await conn.query(query, [ALERT_ANNOUNCEMENT_ID, data.username, data.username]);
   
    logFoundRecords(results)
    
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล Alert จากเกษตกรให้อำเภอของ officer  คนนี้ : ${data.username}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteAlertService(data) {
  try {
    console.log('deleteAlertService');

    const query = `delete from ALERT where alert_id = ?`; 

    const [results, user_fields] = await conn.query(query, [data.alert_id]);

    //prymania ต้อง handle update response_id = 0 แบบนี้ เพราะ mysql trigger ไม่ให้  update table ที่เฝ้าอยู่ 
    //ต้องใช้ temp table เลยคิดว่าทำตรงนี้เลยดีกว่า

    const updatequery = `update ALERT set response_id = 0 where response_id =?`
    const [updateresults, update_fields] = await conn.query(updatequery, [data.alert_id]);


    return (results.affectedRows==0) ? 
      setResponseNotFound(`ALERT alert_id not found : ${data.alert_id}`):
      setResponseSuccess(`Delete ALERT successfully : ${data.alert_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


