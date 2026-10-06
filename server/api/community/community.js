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
import { ROLE_FARMER } from "../../constants/table.const.js";



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function insertCommunityService(data) {
  try {
    console.log('insertCommunityService');

    const query = 
        `insert into COMMUNITY (community_name, head_user)  values (?,?)`;
    const [results, user_fields] = await conn.query(query, [
      data.community_name,   data.head_user
    ]);


    return (results.affectedRows==0) ? 
      setResponseNotFound(`Cannot insert community : ${data.community_name}`):
      setResponseSuccess(`insert successfully, community : ${data.community_name}`);

  } catch (error) {
    return setResponseError(error);
  }  
}



/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectCommunityService(data) {
  try {
    console.log('selectCommunityService');

    const query = 
        `select * from COMMUNITY where community_id = ?`;

    const [results] = await conn.query(query, [
      data.community_id
    ]);
    console.log(results);
    return (results.length==0) ? 
      setResponseNotFound(`no community : ${data.community_id}`):
      setResponseSuccess(results[0]);

  } catch (error) {
    return setResponseError(error);
  }  
}


/**
 * @param {Request} req HTTP request argument to the middleware function.
 */
export async function selectCommunityMemberService(data) {
  try {
    console.log('selectCommunityMemberService');

    const query = 
        `select * from COMMUNITY_MEMBER where community_id = ?`;

    const [results] = await conn.query(query, [
      data.community_id
    ]);

    logFoundRecords(results)
    return (results.length==0) ? 
      setResponseNotFound(`no community member : ${data.community_id}`):
      setResponseSuccess(results);

  } catch (error) {
    return setResponseError(error);
  }  
}

