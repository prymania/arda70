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


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertDisasterService(data) {
  try {
    console.log('insertDisasterService');

    const query = `insert into DISASTER(
          plang_id,       category,   type,   affect,     start_date,   
          end_date,       size,       unit,   detail)
          values
          (?,?,?,?,?,  ?,?,?,?)`;

    const [results] = await conn.query(query, [
      data.plang_id,      data.category,    data.type,    data.affect,  data.start_date,  
      data.end_date,      data.size,       data.unit,     data.detail]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่ม Disaster ได้( plang_id) :${data.plang_id}`):
      setResponseSuccess(`insert Disaster successfully, ( plang_id) :  ${data.plang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertDisasterPictureService(data) {
  try {
    console.log('insertDisasterPictureService');
   
    const detail = (data.detail=== undefined)? '':data.detail;
    const query = `insert into DISASTER_PICTURE(disaster_id, picture, detail) values(?,?, ?)`;
    const [image, image_field] = await conn.execute(
      query,
      [data.disaster_id, data.filepath, detail]
    );

    return setResponseSuccess(`${data.filepath}`);
  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updateDisasterService(data) {
  try {
    console.log('updateDisasterService');

    const query = `update DISASTER set
          category    = ?,
          type        = ?,
          affect      = ?,
          start_date  = ?,
          end_date    = ?,
          size        = ?,
          unit        = ?,
          detail      = ?
          where disaster_id = ?`;

    const [results] = await conn.query(query, [
      data.category,  data.type, data.affect,  data.start_date,  data.end_date, data.size,    data.unit,  data.detail, data.disaster_id]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถแก้ไข Disaster ได้ ( disaster_id) :${data.disaster_id}`):
      setResponseSuccess(`update Disaster successfully, ( disaster_id) :  ${data.disaster_id}`);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteDisasterService(data) {
  try {
    console.log('deleteDisasterService');

    const query = `delete from DISASTER where disaster_id = ?`; 

    const [results] = await conn.query(query, [
      data.disaster_id
    ]);

    logFoundRecords(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`Cannot delete Disaster ของ disaster_id: ${data.disaster_id}`):
      setResponseSuccess(`Delete Disaster successfully disaster_id: ${data.disaster_id}`);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteDisasterPictureService(data) {
  try {
    console.log('deleteDisasterPictureService');
    const PICTURE_TABLE = `DISASTER_PICTURE`

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
export async function selectDisasterService(data) {
  try {
    console.log('selectDisasterService');

    const query = (data.search_username !== undefined)?
                      `select DISASTER.* 
                      from    DISASTER, PLANG
                      where   DISASTER.plang_id = PLANG.plang_id
                      and     username = ? order by DISASTER.disaster_id DESC`:
                  (data.search_plang_id !== undefined)?
                      `select DISASTER.* 
                      from    DISASTER
                      where   plang_id = ? order by DISASTER.disaster_id DESC` :
                  (data.search_disaster_id !== undefined)?
                      `select DISASTER.* from DISASTER where disaster_id = ? ` :
                          
                      `select DISASTER.* 
                      from    DISASTER, PLANG
                      where   DISASTER.plang_id = PLANG.plang_id
                      and     username = ? order by DISASTER.disaster_id DESC`;  //username ตัวเอง

    const search_value =  (data.search_username     !== undefined) ? data.search_username : 
                          (data.search_plang_id     !== undefined) ? data.search_plang_id : 
                          (data.search_disaster_id  !== undefined) ? data.search_disaster_id : 
                                                                     data.username ;

    const [results] = await conn.query(query, [search_value]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ Disaster ที่ค้นหา :   ${search_value}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectDisasterPictureService(data) {
  try {
    console.log('selectDisasterPictureService');

    const query = `select * from DISASTER_PICTURE where disaster_id = ? order by disaster_id DESC`; 

    const [results] = await conn.query(query, [
      data.disaster_id
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ picture of disaster_id : ${data.disaster_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}
