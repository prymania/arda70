
import { setLogger } from "../../utils/logger.util.js";
import { handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { deleteDisasterPictureService, deleteDisasterService, insertDisasterPictureService, insertDisasterService, selectDisasterPictureService, selectDisasterService, updateDisasterService} from "./disaster.js";

const logger = setLogger(import.meta.url);



/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertDisasterController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "เพิ่ม ข้อมูล Disaster (ภัยแล้ง, น้ำท่วม, โรคพืช, อื่น ๆ) ลงแปลงเกษตร by plang_id"
    #swagger.description = "เพิ่ม ข้อมูล Disaster ของแปลงเกษตร  <br>"
  
  */ 
      try {
        const data = {
          plang_id:     req.body.plang_id,
          category:     req.body.category,
          type:         req.body.type,
          affect:       req.body.affect,
          start_date:   req.body.start_date,
          end_date:     req.body.end_date,
          size:         req.body.size,
          unit:         req.body.unit,
          detail:       req.body.detail
        }
  
        const result = await insertDisasterService(data);
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
export async function insertDisasterPictureController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "เพิ่มรูปภาพ disaster by disaster_id "
    #swagger.description = "เพิ่มรูปภาพ disaster by disaster_id  <br>
     <br>"

    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }    
  */ 
      try {
        const filepath = await handleAttachedFile(req, req.username, 'disaster')
        const data = {
          username:       req.username,
          disaster_id:    req.query.disaster_id,
          detail:         req.query.detail,
          filepath:       filepath,
        }

        const result = await insertDisasterPictureService(data);
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
export async function updateDisasterController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "แก้ไข Disaster by disaster_id "
    #swagger.description = "แก้ไช Disaster by disaster_id  <br>
    เผื่อต้องแก้ไขข้อมูล เช่น วันที่สิ้นสุดภัยพิบัติ หรือ detail  or whatever"
  
  */ 
      try {
        
        const data = {
          disaster_id:  req.body.disaster_id,
          category:     req.body.category,
          type:         req.body.type,
          affect:       req.body.affect,
          start_date:   req.body.start_date,
          end_date:     req.body.end_date,
          size:         req.body.size,
          unit:         req.body.unit,
          detail:       req.body.detail
        }
        const result = await updateDisasterService(data);
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
export async function deleteDisasterController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "delete Disaster by disaster_id "
    #swagger.description = "delete Disaster by disaster_id  <br>"
  
  */ 
      try {
        
        const data = {
          disaster_id:     req.query.disaster_id,
        }
  
        const result = await deleteDisasterService(data);
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
export async function deleteDisasterPictureController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "Delete  Disaster picture by picture_id "
    #swagger.description = "Delete  Disaster picture by picture_id <br>"
  
  */ 
      try {
        const data = {
          picture_id:     req.query.picture_id,
        }
  
        const result = await deleteDisasterPictureService(data);
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
export async function selectDisasterController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "แสดงข้อมูล Disaster by username, plang_id, disaster_id "
    #swagger.description = "แสดงข้อมูล Disaster by username, plang_id , disaster_id <br><br>

    ค้นหาข้อมูล Disaster โดย search จากคอลัมน์ที่กำหนดได้อย่างใดอย่างหนึ่งเท่านั้น คือ<br>
    search_username : ถ้าต้องการแสดงว่า search_username มี Disaster อะไรบ้าง <br>
    search_plang_id : ถ้าต้องการแสดงว่า แปลง นี้มี Disaster อะไรบ้าง <br>
    search_disaster_id : ถ้าต้องการแสดงว่า disaster_id นี้มีรายละเอียดอย่างไร<br>
    ถ้าไม่ส่งอะไรมา จะแสดง ว่า user ตัวเอง มีDisaster อะไรบ้าง "
  
  */ 
      try {
        
        const data = {
          search_username:     req.query.search_username,
          search_plang_id:     req.query.search_plang_id,
          search_disaster_id:  req.query.search_disaster_id,
          username:            req.username
        }
        const result = await selectDisasterService(data);
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
export async function selectDisasterPictureController(req, res, next) {
  /*#swagger.tags = ['Disaster'],
    #swagger.summary = "select รูปภาพของ Disaster by disaster_id "
    #swagger.description = "select รูปภาพของ Disaster by disaster_id <br>"
  
  */ 
      try {
        const data = {
          disaster_id:     req.query.disaster_id,
        }
  
        const result = await selectDisasterPictureService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
    
 
 
 