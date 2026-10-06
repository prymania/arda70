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
import { rai_to_msquare } from "../../utils/station.util.js";




/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertSubplangService(data) {
  try {
    console.log('insertSubplangService');

    data.msquare = rai_to_msquare(data.rai, data.ngan, data.wa);
    const query = `insert into SUBPLANG(
          plang_id,   lat_long,   center,       msquare,    rai,
          ngan,       wa,         detail)
          values
          ( ?,?,?,?,?,
            ?,?,?)`;

    const [results] = await conn.query(query, [
      data.plang_id,    data.lat_long,   data.center,         data.msquare,         data.rai,
      data.ngan,        data.wa,      data.detail]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่ม subplang ได้ (plang_id): ${data.plang_id}`):
      setResponseSuccess(`insert Subplang successfully, (subplang_id) : ${results.insertId}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertSubplangPictureService(data) {
  try {
    console.log('insertSubplangPictureService');
   
    const detail = (data.detail==null)? '':data.detail;

    const query = `insert into SUBPLANG_PICTURE(subplang_id,picture, detail) values(?,?, ?)`;
    const [image, image_field] = await conn.execute(
      query,
      [data.subplang_id, data.filepath, detail]
    );

    return setResponseSuccess(`${data.filepath}`);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updateSubplangService(data) {
  try {
    console.log('updateSubplangService');

    data.msquare = rai_to_msquare(data.rai, data.ngan, data.wa);
    const query = `update SUBPLANG set 
          lat_long      = ?,
          center        = ?,
          msquare       = ?,   
          rai           = ?,
          ngan          = ?,

          wa            = ?,    
          detail        = ? 
          where subplang_id    = ?`;

    const [results, user_fields] = await conn.query(query, [
      data.lat_long,    data.center,     data.msquare,         data.rai,    data.ngan,        
      data.wa,          data.detail,     data.subplang_id ]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่พบแปลง ( subplang_id) : ${data.subplang_id}`):
      setResponseSuccess(`edit subplang successfully, ( subplang_id) : ${data.subplang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteSubplangService(data) {
  try {
    console.log('deleteUserSubplangService');

    const query = `delete from SUBPLANG where subplang_id = ?`; 

    const [results] = await conn.query(query, [
      data.subplang_id
    ]);

    logFoundRecords(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`Subplang Subplang_id not found : ${data.subplang_id}`):
      setResponseSuccess(`Delete Subplang successfully : ${data.subplang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteSubplangPictureService(data) {
  try {
    console.log('deleteSubplangPictureService');
    const PICTURE_TABLE = `SUBPLANG_PICTURE`

    const affectedRows = await deletePictureFile(PICTURE_TABLE, data.picture_id);
    console.log(`affectedRows : ${affectedRows}`);
    return  (affectedRows==-1) ?  setResponseNotFound(`ไม่พบ picture_id : ${data.picture_id}`):
            (affectedRows== 0) ?  setResponseNotFound(`Cannot delete picture_id : ${data.picture_id}`):
                                  setResponseSuccess(`Delete successfully picture_id: ${data.picture_id}`);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSubplangService(data) {
  try {
    console.log('selectSubplangService');

    const query =   (data.search_username !== undefined)?
                        `select SUBPLANG.* 
                        from   SUBPLANG, PLANG
                        where  PLANG.plang_id = SUBPLANG.plang_id
                        and    username = ?`:
                    (data.search_plang_id !== undefined)?
                        `select SUBPLANG.* 
                        from   SUBPLANG
                        where  plang_id = ?` :
                    (data.search_subplang_id !== undefined)?
                      `select * from SUBPLANG where subplang_id = ?`:  

                      `select SUBPLANG.* 
                      from   SUBPLANG, PLANG
                      where  PLANG.plang_id = SUBPLANG.plang_id
                      and    username = ?`;

    const search_value =  (data.search_username !== undefined)    ? data.search_username :
                          (data.search_plang_id !== undefined)    ? data.search_plang_id :
                          (data.search_subplang_id !== undefined) ? data.search_subplang_id : 
                                                                    data.username;

    console.log(data);
    console.log(query);
    console.log(search_value);
    const [results] = await conn.query(query, [
      search_value
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ subplang  ของคอลัมน์ : ${search_value}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSubplangPictureService(data) {
  try {
    console.log('selectSubplangPictureService');

    const query = `select * from SUBPLANG_PICTURE where subplang_id = ? order by picture_id DESC`; 

    const [results, user_fields] = await conn.query(query, [
      data.subplang_id
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบแปลง subplang_id : ${data.subplang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSubplangCountActivityService(data) {
  try {
    console.log('selectSubplangCountActivityService');

    const query = `
    select count(case when category = 'ปลูกพืช' then 1 end) as plant,
    count(case when category = 'เลี้ยงสัตว์' then 1 end) as animal
    from ACTIVITY
    where   start_date <= curdate() 
    and     curdate()  <= end_date
    and     subplang_id = ?`; 

    const [results, user_fields] = await conn.query(query, [
      data.subplang_id
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบแปลง Subplang_id : ${data.subplang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}
