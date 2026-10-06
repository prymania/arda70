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
import { UPLOAD_IMAGE_FOLDER } from "../../constants/image.const.js";
import { dateTimeToString } from "../../utils/datetime.util.js";
import fs from "fs";
import { changeFileName } from "../../utils/picture.util.js";
import { DISTRICT_ADDRESS_CODE_INDEX, MSQUARE_TO_RAI, ROLE_FARMER, SUBDISTRICT_ADDRESS_CODE_INDEX } from "../../constants/table.const.js";
import { get_district_address_code, get_subdistrict_address_code, get_user_address_code } from "../../utils/address_code.util.js";
import { manage_role_array } from "../../utils/user.util.js";


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectPlangReportService(data) {
  try {
    console.log('selectPlangReportService');
    
    //pry get address_code แบบนี้เพราะไม่ได้ส่งheader มา ถ้า JWT ส่งheader มาแล้วเอาตรงนี้ออกเลบ
    // const address_code = await get_user_address_code(data.username);
    // ถึงตรงนี้นะ ที่ get_address_code
    const officer_address_code = get_district_address_code(data.address_code);
    console.log(`officer_address_code : ${officer_address_code}`);

    const query = [
            `select 	count(*) as farmer_amount
            from	    USERS
            where 	  username != ?
            and 	    substring(address_code, 1, 4) = ?`
            , 
          
            `select count(*)    as plang_amount       
              from	PLANG
              where	substring(address_code, 1, 4) = ?`
            ,
              `select  IFNULL(ROUND(sum(msquare)* ?),0)   as rai_amount        
              from	PLANG
              where	substring(address_code, 1, 4) = ?`
            ,
            `select   IFNULL(ROUND(sum(ACTIVITY.msquare) * ?),0) as rai_activity
            from 	    ACTIVITY, PLANG
            where 	  ACTIVITY.plang_id 	=	PLANG.plang_id 
            and		    substring(address_code, 1, 4) 		=	?
            and		    ACTIVITY.msquare	is not NULL`
            ,
            `select   type1, ROUND(sum(ACTIVITY.msquare) * ?) as rai_by_type1
            from	    ACTIVITY 
            WHERE 	  plang_id IN
                      (select plang_id
                      from	PLANG
                      WHERE	substring(address_code, 1, 4) 		=	?)
            group by type1 `
    ];

    const [result0] = await conn.query(query[0], [data.username, officer_address_code]);
    const [result1] = await conn.query(query[1], [officer_address_code]);
    const [result2] = await conn.query(query[2], [MSQUARE_TO_RAI, officer_address_code]);
    const [result3] = await conn.query(query[3], [MSQUARE_TO_RAI, officer_address_code]);
    const [result4] = await conn.query(query[4], [MSQUARE_TO_RAI, officer_address_code]);

    const rai_amount    = result2[0].rai_amount;
    const rai_activity  = result3[0].rai_activity;
    const rai_empty     = isNaN(rai_amount - rai_activity)? 0 : (rai_amount - rai_activity);

    const combinedResults = {
      farmer_amount:  result0[0].farmer_amount,
      plang_amount:   result1[0].plang_amount,
      rai_amount:     rai_amount,
      rai_activity:   rai_activity,
      rai_empty:      rai_empty,
      type_data:      result4   //บันทึกการใช้ประโยชน์ตามประเภท เช่น ประมง 4ไร่, พืชไร่ 2ไร่, พืชสวน 5 ไร่
    };

    console.log(combinedResults);

    return setResponseSuccess(combinedResults);

  } catch (error) {
    return setResponseError(error);
  }  
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectDistrictOverviewService(data) {
  try {
    console.log('selectDistrictOverviewService');
    
    const officer_address_code = get_district_address_code(data.address_code);
    console.log(`officer_address_code : ${officer_address_code}`);

    const query =
    `SELECT
              t1.subdistrict_name
              , t1.subdistrict_addresscode
              , t1.farmer_amount
              , IFNULL(t2.plang_amount, 0) AS plang_amount
              , IFNULL(t2.rai_amount, 0)	as rai_amount
    FROM
        (SELECT 	distinct(subdistrict) 				    as subdistrict_name
                  , substring(address_code, 1, ?)		as subdistrict_addresscode
                  , COUNT(*) 							          AS farmer_amount
        FROM 		  USERS
        WHERE 		substring(USERS.address_code, 1, ?) = ?
        and       USERS.username  != ?
        and		    USERS.subdistrict IS NOT NULL 
        AND 		  USERS.subdistrict NOT IN('any', '')  
        GROUP BY 	USERS.subdistrict, substring(USERS.address_code, 1, ?)) t1
        LEFT JOIN
        (SELECT   distinct(subdistrict)
                  , substring(address_code, 1, ?)                 as subdistrict_addresscode
                  , count(plang_id)				                        as plang_amount
                  , IFNULL(ROUND(sum(msquare) * ?),0)		as rai_amount
        FROM    PLANG
        WHERE 	substring(address_code, 1, ?) = ?
        GROUP   BY subdistrict, substring(address_code, 1, ?)) t2
        ON
        t1.subdistrict_addresscode = t2.subdistrict_addresscode`;

    const [results] = await conn.query(query, [
             SUBDISTRICT_ADDRESS_CODE_INDEX
            , DISTRICT_ADDRESS_CODE_INDEX
            , officer_address_code
            , data.username
            , SUBDISTRICT_ADDRESS_CODE_INDEX
            , SUBDISTRICT_ADDRESS_CODE_INDEX
            , MSQUARE_TO_RAI
            , DISTRICT_ADDRESS_CODE_INDEX
            , officer_address_code
            , SUBDISTRICT_ADDRESS_CODE_INDEX]);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ farmer in this district (username)  : ${data.username}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }  
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectSubdistrictOverviewService(data) {
  try {
    console.log('selectSubdistrictOverviewService');
    
    const officer_address_code = get_subdistrict_address_code(data.address_code);
    console.log(`subdistrict_address_code : ${officer_address_code}`);

    const query =
    `SELECT
              t1.subdistrict_name
              , t1.subdistrict_addresscode
              , t1.farmer_amount
              , IFNULL(t2.plang_amount, 0) AS plang_amount
              , IFNULL(t2.rai_amount, 0)	as rai_amount
    FROM
        (SELECT 	distinct(subdistrict) 				    as subdistrict_name
                  , substring(address_code, 1, ?)		as subdistrict_addresscode
                  , COUNT(*) 							          AS farmer_amount
        FROM 		  USERS
        WHERE 		substring(USERS.address_code, 1, ?) = ?
        and       USERS.username  != ?
        and		    USERS.subdistrict IS NOT NULL 
        AND 		  USERS.subdistrict NOT IN('any', '')  
        GROUP BY 	USERS.subdistrict, substring(USERS.address_code, 1, ?)) t1
        LEFT JOIN
        (SELECT   distinct(subdistrict)
                  , substring(address_code, 1, ?)                 as subdistrict_addresscode
                  , count(plang_id)				                        as plang_amount
                  , IFNULL(ROUND(sum(msquare) * ?),0)		as rai_amount
        FROM    PLANG
        WHERE 	substring(address_code, 1, ?) = ?
        GROUP   BY subdistrict, substring(address_code, 1, ?)) t2
        ON
        t1.subdistrict_addresscode = t2.subdistrict_addresscode`;

    const [results] = await conn.query(query, [
             SUBDISTRICT_ADDRESS_CODE_INDEX
            , SUBDISTRICT_ADDRESS_CODE_INDEX
            , officer_address_code
            , data.username
            , SUBDISTRICT_ADDRESS_CODE_INDEX
            , SUBDISTRICT_ADDRESS_CODE_INDEX
            , MSQUARE_TO_RAI
            , SUBDISTRICT_ADDRESS_CODE_INDEX
            , officer_address_code
            , SUBDISTRICT_ADDRESS_CODE_INDEX]);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ farmer in this district (username)  : ${data.username}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }  
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectFarmerInSubdistrictReportService(data) {
  try {
    console.log('selectFarmerInSubdistrictReportService');
    
    //pry get address_code แบบนี้เพราะไม่ได้ส่งheader มา ถ้า JWT ส่งheader มาแล้วเอาตรงนี้ออกเลบ
    // const address_code = await get_user_address_code(data.username);
    // ถึงตรงนี้นะ ที่ get_address_code

    const subdistrict_addresscode = get_subdistrict_address_code(data.subdistrict_addresscode);
    console.log(data.subdistrict_addresscode, subdistrict_addresscode);


    const query =
      `select   USERS.username
                , concat(title, ' ', name, ' ', surname) as farmer_name
                , IFNULL(count(plang_id),0) 				as plang_amount
                , IFNULL(ROUND(sum(msquare)* ?),0) 	as rai_amount
                , gender, USERS.address_code, USERS.village, USERS.subdistrict, USERS.district, USERS.province, user_role
      FROM 	    USERS
      LEFT JOIN PLANG
      ON 		    USERS.username = PLANG.username
      where 	  substring(USERS.address_code, 1, ?) = ?
      AND 	  	USERS.username != ?
      group by 	USERS.username
      order by 	USERS.subdistrict, count(*) DESC
      `;

      const [results] = await conn.query(query, [
        MSQUARE_TO_RAI
        , SUBDISTRICT_ADDRESS_CODE_INDEX
        // , data.subdistrict_addresscode
        , subdistrict_addresscode
        , data.username
      ]);
      // console.log(results);

    manage_role_array(results, 'user_role');

    logFoundRecords(results)
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ farmer in this subdistrict (username)  : ${data.username}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }  
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectAllFarmerInDistrictReportService(data) {
  try {
    console.log('selectAllFarmerInDistrictReportService');
    
    //pry get address_code แบบนี้เพราะไม่ได้ส่งheader มา ถ้า JWT ส่งheader มาแล้วเอาตรงนี้ออกเลบ
    // const address_code = await get_user_address_code(data.username);
    // ถึงตรงนี้นะ ที่ get_address_code
    const officer_address_code = get_district_address_code(data.address_code);
    console.log(data.username, officer_address_code);

    const query = 
            `select   USERS.username
                      , concat(title, ' ', name, ' ', surname) as farmer_name
                      , IFNULL(count(plang_id), 0)   as plang_amount
                      , IFNULL(ROUND(sum(msquare)* ?),0)          as rai_amount
                      , gender, USERS.address_code, USERS.village, USERS.subdistrict, USERS.district, USERS.province, user_role
            FROM 	  USERS left join PLANG
            on 	    USERS.username = PLANG.username
            where   substring(USERS.address_code, 1, ?) = ?
            AND 	  USERS.username != ?
            group by USERS.username
            order by USERS.subdistrict, count(*) DESC
            `;

    const [results] = await conn.query(query, [
        MSQUARE_TO_RAI
        , DISTRICT_ADDRESS_CODE_INDEX
        , officer_address_code
        , data.username]);    
    
    manage_role_array(results , 'user_role');

    logFoundRecords(results);
    return (results.length==0) ? 
      setResponseNotFound(`ไม่พบ farmer in this district (username)  : ${data.username}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }  
}
