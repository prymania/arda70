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
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { log } from "console";
import { rai_to_msquare } from "../../utils/station.util.js";

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertPlangService(data) {
  try {
    console.log('insertPlangService');

    data.msquare = rai_to_msquare(data.rai, data.ngan, data.wa);
    const iaddress_code = (data.plang_address_code  === undefined) ? data.address_code : data.plang_address_code;

    const query = `insert into PLANG(
          username,   lat_long,   center,       msquare,      rai,
          ngan,       wa,         address_code, moo,		      village,		
          road,		    subdistrict,  district,   province,     plang_name, 
          title_deed,   own_type,     detail)
          values
          (?,?,?,?,?,  ?,?,?,?,?,  ?,?,?,?,?,  ?,?,?)`;

    const [results] = await conn.query(query, [
      data.username,    data.lat_long,    data.center,        data.msquare,         data.rai,
      data.ngan,        data.wa,          iaddress_code,      data.moo,		          data.village,		  
      data.road,		    data.subdistrict, data.district,      data.province,        data.plang_name,  
      data.title_deed,  data.own_type,    data.detail]);


    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่มแปลงได้ : ${data.username}`):
      setResponseSuccess(`insert PLANG successfully, USERS : ${data.username}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertWaterSupplyService(data) {
  try {
    console.log('insertWaterSupplyService');

    const query = `insert into WATER_SUPPLY(
          plang_id,   supply_type,  width,  depth,     water_depth,     detail)
          values
          (?,?,?,?,?,   ?)`;

    const [results, user_fields] = await conn.query(query, [
      data.plang_id,  data.supply_type,    data.width,        data.depth,      data.water_depth,  data.detail]);

    console.log(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่ม water supplyได้ : ${data.plang_id}`):
      setResponseSuccess(`insert water supply successfully, plang_id : ${data.plang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertWaterSourceService(data) {
  try {
    console.log('insertWaterSourceService');

    const query = `insert into WATER_SOURCE(
          plang_id,   source_type,  source_name,  width, depth,     water_depth, detail)
          values
          (?,?,?,?,?,   ?,?)`;

    const [results, user_fields] = await conn.query(query, [
      data.plang_id,  data.source_type,    data.source_name,  data.width, data.depth, data.water_depth,          data.detail]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่มwater sourceได้ plangid: ${data.plang_id}`):
      setResponseSuccess(`insert water_source successfully, plangid : ${data.plang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertPlangPictureService(data) {
  try {
    console.log('insertPlangPictureService');
   
    const detail = (data.detail === undefined)? '' : data.detail;

    const query = `insert into PLANG_PICTURE(plang_id, picture, detail) values(?, ?, ?)`;
    const [image, image_field] = await conn.execute(
      query,
      [data.plang_id, data.filepath, detail]
    );

    return setResponseSuccess(`${data.filepath}`);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function updatePlangService(data) {
  try {
    console.log('updatePlangService');

    data.msquare = rai_to_msquare(data.rai, data.ngan, data.wa);
    const query = `update PLANG set 
          lat_long      = ?,
          center        = ?,
          msquare       = ?,   
          rai           = ?,
          ngan          = ?,

          wa            = ?, 
          address_code  = ?,
          moo           = ?,	
          village       = ?,	
          road          = ?,		

          subdistrict   = ?,  
          district      = ?,
          province      = ?,
          plang_name    = ?, 
          title_deed    = ?, 

          own_type      = ?,     
          detail        = ? 

          where plang_id    = ?`;

    const [results] = await conn.query(query, [
      data.lat_long,    data.center,        data.msquare,         data.rai,           data.ngan,
      data.wa,          data.address_code,  data.moo,		          data.village,		    data.road,		    
      data.subdistrict, data.district,      data.province,        data.plang_name,    data.title_deed,    
      data.own_type,    data.detail,        data.plang_id ]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่พบแปลง ( plang_id) : ${data.plang_id}`):
      setResponseSuccess(`edit PLANG successfully, ( plang_id) : ${data.plang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deletePlangService(data) {
  try {
    console.log('deleteUserPlangService');

    const query = `delete from PLANG where plang_id = ?`; 

    const [results] = await conn.query(query, [
      data.plang_id
    ]);

    logFoundRecords(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`Plang plang_id not found : ${data.plang_id}`):
      setResponseSuccess(`Delete plang successfully : ${data.plang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deletePlangPictureService(data) {
  try {
    console.log('deletePlangPictureService');
    const PICTURE_TABLE = `PLANG_PICTURE`

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
export async function selectPlangService(data) {
  try {
    console.log('selectPlangService');

    console.log(data);
    let query = '';
    let search_value = '';

    if(data.search_username !== undefined){ //search by search_username
      query = `select * from PLANG where username = ?`;
      search_value = data.search_username;
    }
    else if(data.search_plang_id !== undefined){ //search by plang_id
      query = `select * from PLANG where plang_id = ?`;
      search_value = data.search_plang_id;
    }
    else{   // search by username (login user)
      query = `select * from PLANG where username = ?`;
      search_value = data.username;
    }

    let [results] = await conn.query(query, [search_value]);
    
    //  code นี้เพื่อต่อ water_supply แต่ hard_code เพื่อทดลองเฉย ๆ ตอนนี้ยังไม่ return water_supply, water_source
    // const water_supply = `select * from WATER_SUPPLY where plang_id = 3`;
    // const [supply_result, supply_fields] = await conn.query(water_supply, []);
    // results[0].water_supply = supply_result;
    
    
    logFoundRecords(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูลแปลง  : ${search_value}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectPlangPictureService(data) {
  try {
    console.log('selectPlangPictureService');

    const query = `select * from PLANG_PICTURE where plang_id = ? order by picture_id DESC`; 

    const [results, user_fields] = await conn.query(query, [
      data.plang_id
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบแปลง picture of plang_id : ${data.plang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}




/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectWaterSupplyService(data) {
  try {
    console.log('selectWaterSupplyService');

    const query =  `select * from WATER_SUPPLY where plang_id = ?` ;// plang_id

    let [results] = await conn.query(query, [data.plang_id]);
       
    logFoundRecords(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล water_supply  : ${data.plang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectWaterSourceService(data) {
  try {
    console.log('selectWaterSourceService');

    const query =  `select * from WATER_SOURCE where plang_id = ?` ;// plang_id

    let [results] = await conn.query(query, [data.plang_id]);
       
    logFoundRecords(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล water_source : ${data.plang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectPlangCountDetailService(data) {
  try {
    console.log('selectPlangCountDetailService');

    // const query = `
    // select  count(case when category = 'ปลูกพืช' then 1 end) as plant,
    //         count(case when category = 'เลี้ยงสัตว์' then 1 end) as animal
    // from    ACTIVITY
    // where     plang_id = ?`; 

    const query = `
    SELECT  IFNULL(category, 'ปลูกพืช') as title, count(*) as amount
    FROM    ACTIVITY   where  category = 'ปลูกพืช'    AND plang_id = ? UNION
    SELECT  IFNULL(category, 'เลี้ยงสัตว์') as title, count(*) as amount
    FROM    ACTIVITY   where  category = 'เลี้ยงสัตว์'   AND plang_id = ? UNION
    SELECT  IFNULL(NULL, 'subplang') as title, count(*) as amount
    FROM    SUBPLANG   where  plang_id = ?                            UNION
    SELECT  IFNULL(NULL, 'disaster') as title, count(*) as amount
    FROM    DISASTER   where  plang_id = ?
    `

    const [results, user_fields] = await conn.query(query, [
      data.plang_id, data.plang_id, data.plang_id, data.plang_id
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบแปลง plang_id : ${data.plang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteWaterSourceService(data) {
  try {
    console.log('deleteWaterSourceService');

    const query = `delete from WATER_SOURCE where wid = ?`; 

    const [results] = await conn.query(query, [
      data.wid
    ]);

    logFoundRecords(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`WaterSource wid not found : ${data.wid}`):
      setResponseSuccess(`Delete WaterSource successfully : ${data.wid}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function deleteWaterSupplyService(data) {
  try {
    console.log('deleteWaterSupplyService');

    const query = `delete from WATER_SUPPLY where wid = ?`; 

    const [results] = await conn.query(query, [
      data.wid
    ]);

    logFoundRecords(results);
    return (results.affectedRows==0) ? 
      setResponseNotFound(`WaterSupply wid not found : ${data.wid}`):
      setResponseSuccess(`Delete WaterSupply successfully : ${data.wid}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertSoilMeterService(data) {
  try {
    console.log('insertSoilMeterService');

    const query = `insert into SOIL_METER(
          plang_id,   
          soil,  t, ph, ec, n, p, k, 
          detail)
          values
          (?,
          ?,?,?,?,?,?,?,
          ?)`;

    const [results] = await conn.query(query, [
        data.plang_id,   
        data.soil,  data.t, data.ph, data.ec, data.n, data.p, data.k,       
        data.detail]);

    return (results.affectedRows==0) ? 
      setResponseNotFound(`ไม่สามารถเพิ่ม SOIL METER plangid: ${data.plang_id}`):
      setResponseSuccess(`insert SOIL METER successfully, plangid : ${data.plang_id}`);

  } catch (error) {
    return setResponseError(error);
  }
   
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSoilMeterService(data) {
  try {
    console.log('selectSoilMeterService');

    const query =  `select * from SOIL_METER where plang_id = ? order by sid DESC` ;// plang_id

    let [results] = await conn.query(query, [data.search_plang_id]);
       
    logFoundRecords(results);

    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบข้อมูล SOIL METER : ${data.search_plang_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}
