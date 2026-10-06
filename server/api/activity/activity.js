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
export async function insertActivityService(data) {
  try {
    console.log('insertActivityService');
    data.msquare = rai_to_msquare(data.rai, data.ngan, data.wa);

    const query = `insert into ACTIVITY(
          plang_id,       subplang_id,    type1,        type2,      type3,    
          pattern,        msquare,        rai,          ngan,       wa,
          pond,           amount_per_pond,
          amount,         unit,           start_date,   end_date,   detail)
          values
          (?,?,?,?,?,  ?,?,?,?,?,   ?,?,  ?,?,?,?,?)`;

    const [results, user_fields] = await conn.query(query, [
      data.plang_id,      data.subplang_id,   data.type1,     data.type2,       data.type3,    
      data.pattern,       data.msquare,       data.rai,       data.ngan,        data.wa, 
      data.pond,          data.amount_per_pond,           
      data.amount,        data.unit,        data.start_date,    data.end_date,      data.detail]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่ม activity ได้(plang_id, subplang_id) : ${data.plang_id}, ${data.subplang_id}`):
      setResponseSuccess(`insert Activity successfully, (plang_id, subplang_id) : ${data.plang_id}, ${data.subplang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertActivityPictureService(data) {
  try {
    console.log('insertActivityPictureService');
   
    const detail = (data.detail==null)? '':data.detail;

    const query = `insert into ACTIVITY_PICTURE(activity_id,picture, detail) values(?,?, ?)`;
    const [image] = await conn.execute(
      query,
      [data.activity_id, data.filepath, detail]
    );

    return setResponseSuccess(`${data.filepath}`);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updateActivityService(data) {
  try {
    console.log('updateActivityService');
    data.msquare = rai_to_msquare(data.rai, data.ngan, data.wa);

    const query = `update ACTIVITY set
          type1    = ?,     
          type2    = ?,     
          type3    = ?,    

          pattern = ?,
          msquare = ?,
          rai         = ?,
          ngan        = ?,
          wa          = ?,    

          pond            = ?,
          amount_per_pond = ?,
          amount          = ?,
          unit            = ?,

          start_date  = ?,     
          end_date    = ?,       
          detail      = ?
          where activity_id = ?`;

    const [results, user_fields] = await conn.query(query, [
      data.type1,     data.type2,                   data.type3,    
      data.pattern,       data.msquare,             data.rai,       data.ngan,        data.wa, 
      data.pond,          data.amount_per_pond,     data.amount,    data.unit,        
      data.start_date,    data.end_date,      data.detail,
      data.activity_id]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถ edit activity ได้(activity_id) : ${data.activity_id}`):
      setResponseSuccess(`update Activity successfully, (activity_id) : ${data.activity_id}`);

  } catch (error) {
    return setResponseError(error);
  }
}




/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteActivityService(data) {
  try {
    console.log('deleteActivityService');

    const query = `delete from ACTIVITY where activity_id = ?`; 

    const [results] = await conn.query(query, [
      data.activity_id
    ]);

    logFoundRecords(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`No activity_id: ${data.activity_id}`):
      setResponseSuccess(`Delete activity successfully activity_id: ${data.activity_id}`);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteActivityPictureService(data) {
  try {
    console.log('deleteActivityPictureService');
    const PICTURE_TABLE = `ACTIVITY_PICTURE`

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
export async function selectActivityService(data) {
  try {
    console.log('selectActivityService');
    const query = (data.search_username !== undefined)?
                      `select ACTIVITY.*
                      from    PLANG, ACTIVITY
                      where   PLANG.plang_id = ACTIVITY.plang_id
                      and     PLANG.username = ? order by ACTIVITY.activity_id DESC`:
                  (data.search_plang_id !== undefined)?
                      `select ACTIVITY.* 
                      from    ACTIVITY
                      where   plang_id = ? order by ACTIVITY.activity_id DESC` :
                  (data.search_subplang_id !== undefined)?
                      `select ACTIVITY.* 
                      from    ACTIVITY
                      where   subplang_id = ?  order by ACTIVITY.activity_id DESC` :
                  (data.search_activity_id !== undefined)?
                      `select ACTIVITY.* from ACTIVITY where activity_id = ?`:
                      
                      `select ACTIVITY.*
                      from    PLANG, ACTIVITY
                      where   PLANG.plang_id = ACTIVITY.plang_id
                      and     PLANG.username = ? order by ACTIVITY.activity_id DESC`;  //username ตัวเอง

    const search_value =  (data.search_username     !== undefined) ? data.search_username : 
                          (data.search_plang_id     !== undefined) ? data.search_plang_id : 
                          (data.search_subplang_id  !== undefined) ? data.search_subplang_id : 
                          (data.search_activity_id  !== undefined) ? data.search_activity_id:
                                                                     data.username ;
    const [results] = await conn.query(query, [search_value]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ activity : ${search_value}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectActivityPictureService(data) {
  try {
    console.log('selectActivityPictureService');

    const query = `select * from ACTIVITY_PICTURE where activity_id = ? order by activity_id DESC`; 

    const [results, user_fields] = await conn.query(query, [
      data.activity_id
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ activity_id : ${data.activity_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}




// ACTIVITY_MASTER -----------------------------------------------------
// ---------------------------------------------------------------------

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectActivityMasterType1Service(data) {
  try {
    console.log('selectActivityMasterType1Service');

    const query = `select 	DISTINCT (type1) 
                      from 	ACTIVITY_MASTER`;

    const [results] = await conn.query(query, []);

    logFoundRecords(results);
    return setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectActivityMasterType2Service(data) {
  try {
    console.log('selectActivityMasterType2Service');
    const query = 
          `select 	DISTINCT (type2) 
          from	ACTIVITY_MASTER 
          where 	type1 = ? order by type2`;

    const [results, user_fields] = await conn.query(query, [data.type1]);

    logFoundRecords(results);
    return setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectActivityMasterType3Service(data) {
  try {
    console.log('selectActivityMasterType3Service');

    const query = 
          `select 	type3, pattern, unit
          from	    ACTIVITY_MASTER 
          where 	  type2 = ? order by type3`;

    const [results, user_fields] = await conn.query(query, [data.type2]);

    logFoundRecords(results);
    return setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}
