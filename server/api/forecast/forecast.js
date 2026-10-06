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
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { LIMIT_FORECAST_RECORD } from "../../constants/table.const.js";
import { get_station_code, get_date_rank } from "../../utils/station.util.js";
import { log } from "console";


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectStationService(data) {
  try {
    console.log('selectStationService');

    const query = `select * from STATION where station_code = ?`; 
    const district_code = data.address_code.substr(0,4);
    console.log(`district_code = ${district_code}`);


    const [results, user_fields] = await conn.query(query, [
      district_code
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ station (username, address_code) : ${data.search_username}, ${data.address_code}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSPIService(data) {
  try {
    console.log('selectSPIService');

    const date_rank = get_date_rank();
    const station_code =  await get_station_code(data)
    console.log(`station_code ================ ${station_code}`);

    const query = ` select *
                    FROM	  MODEL_SPI
                    WHERE 	station_code = ?
                    AND		  id >=
                            (select 	id 
                            FROM	    MODEL_SPI
                            WHERE	    station_code  = ?
                            AND		    year 		      = ?
                            and 	    month 		    = ?
                            and 	    rank 		      = ?)
                    order by id
                    LIMIT ?`; 

    const [results] = await conn.query(query, [
      station_code, station_code, date_rank.year, date_rank.month, date_rank.rank, LIMIT_FORECAST_RECORD
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ station (username, station_code) : ${data.username}, ${station_code}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSRIService(data) {
  try {
    console.log('selectSRIService');

    const date_rank = get_date_rank();
    const station_code =  await get_station_code(data)
    console.log(`station_code ================ ${station_code}`);

    const query = ` select *
                    FROM	  MODEL_SRI
                    WHERE 	station_code = ?
                    AND		  id >=
                            (select 	id 
                            FROM	    MODEL_SRI
                            WHERE	    station_code  = ?
                            AND		    year 		      = ?
                            and 	    month 		    = ?
                            and 	    rank 		      = ?)
                    order by id
                    LIMIT ?`; 

    const [results] = await conn.query(query, [
      station_code, station_code, date_rank.year, date_rank.month, date_rank.rank, LIMIT_FORECAST_RECORD
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ station (username, station_code) : ${data.username}, ${station_code}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSSIService(data) {
  try {
    console.log('selectSSIService');

    const date_rank = get_date_rank();
    const station_code =  await get_station_code(data)
    console.log(`station_code ================ ${station_code}`);

    const query = ` select *
                    FROM	  MODEL_SSI
                    WHERE 	station_code = ?
                    AND		  id >=
                            (select 	id 
                            FROM	    MODEL_SSI
                            WHERE	    station_code  = ?
                            AND		    year 		      = ?
                            and 	    month 		    = ?
                            and 	    rank 		      = ?)
                    order by id
                    LIMIT ?`; 

    const [results, user_fields] = await conn.query(query, [
      station_code, station_code, date_rank.year, date_rank.month, date_rank.rank, LIMIT_FORECAST_RECORD
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ station (username, station_code) : ${data.username}, ${station_code}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectNDVIService(data) {
  try {
    console.log('selectNDVIService');

    const date_rank = get_date_rank();
    const station_code =  await get_station_code(data)
    console.log(`station_code ================ ${station_code}`);

    const query = ` select *
                    FROM	  MODEL_NDVI
                    WHERE 	station_code = ?
                    AND		  id >=
                            (select 	id 
                            FROM	    MODEL_NDVI
                            WHERE	    station_code  = ?
                            AND		    year 		      = ?
                            and 	    month 		    = ?)
                    order by id
                    LIMIT ?`; 

    const [results] = await conn.query(query, [
      station_code, station_code, date_rank.year, date_rank.month, LIMIT_FORECAST_RECORD
    ]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ station (username, station_code) : ${data.username}, ${station_code}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectWDIService(data) {
  try {
    console.log('selectWDIService');

    const date_rank = get_date_rank();
    const station_code =  await get_station_code(data)
    console.log(`station_code ================ ${station_code}`);

    const query = [`select distinct river,
                    case
                          when river = 'K' then 'ลุ่มน้ำโขง'
                          when river = 'C' then 'ลุ่มน้ำชี'
                          when river = 'M' then 'ลุ่มน้ำมูล'
                          else '-'   end as river
                    FROM	  MODEL_WDI
                    WHERE 	station_code = ?`
                    ,
                    `select id, station_code, year, month, rank, value
                    FROM	  MODEL_WDI
                    WHERE 	station_code = ?
                    AND		  id >=
                            (select 	id 
                            FROM	    MODEL_WDI
                            WHERE	    station_code  = ?
                            AND		    year 		      = ?
                            and 	    month 		    = ?
                            and 	    rank 		      = ?)
                    order by id
                    LIMIT ?`]; 
    
    const [sub_results0] = await conn.query(query[0], [station_code]);
    const [sub_results1] = await conn.query(query[1], [
      station_code, station_code, date_rank.year, date_rank.month, date_rank.rank, LIMIT_FORECAST_RECORD
    ]);

    const results = {
      river:  sub_results0[0].river,
      result: sub_results1
    }
    console.log(sub_results0);
    logFoundRecords(sub_results1);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ station (username, station_code) : ${data.username}, ${station_code}`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}


// หน้าอากาศวันนี้**********************************************
// *********************************************************


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSoilLocationService(data) {
  try {
    console.log('selectSoilLocationService');

    const query = 
    `SELECT  sl.id
            , latitude
            , longitude
            , soil_group
            , CASE when sl.soil_aka  = '' then 'ไม่มีข้อมูล' else sl.soil_aka       end as soil_aka
            , CASE when soil_name       = '' then 'ไม่มีข้อมูล' else soil_name      end as soil_name
            , CASE when soil_fertility  = '' then 'ไม่มีข้อมูล' else soil_fertility end as soil_fertility
            , CASE when soil_ph         = '' then 'ไม่มีข้อมูล' else soil_ph        end as soil_ph
            , CASE when soil_texture    = '' then 'ไม่มีข้อมูล' else soil_texture   end as soil_texture
            , IFNULL(sp.suitable_plant, 'ไม่มีข้อมูล') as suitable_plant
            , IFNULL(sp.soil_property, 'ไม่มีข้อมูล') as soil_property
            , 6371 * 2 * ASIN(SQRT(
                POWER(SIN((? - abs(latitude)) * pi()/180 / 2), 2) + 
                COS(? * pi()/180 ) * COS(abs(latitude) * pi()/180) * 
                POWER(SIN((? - longitude) * pi()/180 / 2), 2)
            )) AS distance
        FROM SOIL_LOCATION sl  LEFT JOIN SOIL_PLANT sp
        on sl.soil_aka = sp.soil_aka

        ORDER BY distance
        LIMIT 1`; 
    
    let [results] = await conn.query(query, [
      data.latitude, data.latitude, data.longitude
    ]);

    logFoundRecords(results)
    //แปลง suitable_plant ให้เป็น array เพราะ database เก็บข้อมูลเป็น string เช่น ยางนา แค มะลิ ข้าว
    const plants = results[0].suitable_plant.trim().split(" ");
    delete results[0].suitable_plant;
    results[0].suitable_plant = plants;


    console.log(results);
    return setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}


function get_spi_plant_index(value){
  return  (value <= -1.5)? 1 :
          (value <= -1.0)? 2 :
          (value <= 1)   ? 3 :
          (value <= 1.5) ? 4 : 5;
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectPlantsService(data) {
  try {
    console.log('selectPlantsService');

    const spi_index = await selectSPIService(data);
    // console.log('spi_index----------------------', spi_index);
    let spi_plant_index = 0;

    if (spi_index && spi_index.result && spi_index.result.length > 0) {
      const firstValue = spi_index.result[0].value; // Extract the `value` of the first object
      spi_plant_index = get_spi_plant_index(firstValue); // Determine the SPI index based on conditions
  
      // Log the result
      console.log('First spi Value:', firstValue);
      console.log('plant Index:', spi_plant_index);
    } else {
        console.error('No valid data found in result');
    }

    const query = ` select *
                    FROM	  PLANTS_BY_SPI_INDEX
                    WHERE 	plant_index = ?`; 

    const [results] = await conn.query(query, [ spi_plant_index]);

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ suitable plants`):
      setResponseSuccess(results);
  } catch (error) {
    return setResponseError(error);
  }
}
