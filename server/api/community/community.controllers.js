
import { setLogger } from "../../utils/logger.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { insertCommunityService, selectCommunityMemberService, selectCommunityService } from "./community.js";
const logger = setLogger(import.meta.url);


/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertCommunityController(req, res, next) {
  /*#swagger.tags = ['Community'],
    #swagger.summary = "เพิ่ม community (ชุมชน) ใหม่",
    #swagger.description = "เพิ่ม community (ชุมชน) ใหม่ <br>
    <br> head_user  คือ user_name ของคนที่เป็นหัวหน้าชุมชน"
    
  */   

    try {
      const data ={
        community_name:        req.query.community_name,
        head_user:             req.query.head_user
      }
      const result = await insertCommunityService(data);
      return next(result);
    } catch (error) {
      return next(error);
    }
  }


/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectCommunityController(req, res, next) {
  /*#swagger.tags = ['Community'],
    #swagger.summary = "ดูข้อมูล community (ชุมชน) by community_id ",
    #swagger.description = "ดูข้อมูล community (ชุมชน)  <br>
    <br> ข้อมูลที่เกี่ยวกับชุมชน คือ หัวหน้า ที่ตั้ง ... "
    
  */   

    try {
      const data ={
        community_id:        req.query.community_id,
      }
      const result = await selectCommunityService(data);
      return next(result);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }


/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectCommunityMemberController(req, res, next) {

  /*#swagger.tags = ['Community'],
    #swagger.summary = "ดูข้อมูล สมาชิกcommunity (ชุมชน) by community_id ",
    #swagger.description = "ดูข้อมูล สมาชิกcommunity (ชุมชน)  <br>
    <br> แสดง username  ที่เป็นสมาชิกของชุมชนนี้ ... "
    
  */  

    try {
      const data ={
        community_id:        req.query.community_id
      }
      const result = await selectCommunityMemberService(data);
      return next(result);
    } catch (error) {
      return next(error);
    }
  }

