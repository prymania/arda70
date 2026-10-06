
import { setLogger } from "../../utils/logger.util.js";
import { handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { deleteSubplangPictureService, deleteSubplangService, insertSubplangPictureService, insertSubplangService, selectSubplangCountActivityService, selectSubplangPictureService, selectSubplangService, updateSubplangService } from "./subplang.js";

const logger = setLogger(import.meta.url);



/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertSubplangController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "เพิ่ม ข้อมูล subplang ลง plang_id นี้"
    #swagger.description = "เพิ่ม ข้อมูล subplang ภายใต้ plang_id <br>"
  
  */ 
      try {
        
        const data = {
          plang_id:     req.body.plang_id,
          lat_long:     req.body.lat_long,
          center:       req.body.center,
          msquare:      req.body.msquare,
          rai:          req.body.rai,
          ngan:         req.body.ngan,
          wa:           req.body.wa,
          detail:       req.body.detail
        }
  
        const result = await insertSubplangService(data);
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
export async function insertSubplangPictureController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "เพิ่มรูปภาพ subplang by subplang_id "
    #swagger.description = "เพิ่มรูปภาพsubplang by subplang_id  <br>"
    
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }
  
  */ 
      try {
        const filepath = await handleAttachedFile(req, req.username, 'subplang')
        const data = {
          username:       req.username,
          subplang_id:    req.query.subplang_id,
          detail:         req.query.detail,
          filepath:       filepath
        }

        const result = await insertSubplangPictureService(data);
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
export async function updateSubplangController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "edit ข้อมูล subplang  by subplang_id "
    #swagger.description = "edit ข้อมูล subplang  by subplang_id  <br>"
  
  */ 
      try {
        
        const data = {
          subplang_id:  req.body.subplang_id,
          lat_long:     req.body.lat_long,
          center:       req.body.center,
          msquare:      req.body.msquare,
          rai:          req.body.rai,
          ngan:         req.body.ngan,
          wa:           req.body.wa,
          detail:       req.body.detail
        }
  
        const result = await updateSubplangService(data);
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
export async function deleteSubplangController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "Delete ข้อมูล subplang ของเกษตกร by subplang_id "
    #swagger.description = "Delete ข้อมูล subplangของเกษตกร by subplang_id <br>"
  
  */ 
      try {
        const data = {
          subplang_id:     req.query.subplang_id,
        }
  
        const result = await deleteSubplangService(data);
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
export async function deleteSubplangPictureController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "Delete  subplang picture by picture_id "
    #swagger.description = "Delete  subplang picture by picture_id <br>"
  
  */ 
      try {
        const data = {
          picture_id:     req.query.picture_id,
        }
  
        const result = await deleteSubplangPictureService(data);
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
export async function selectSubplangController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "แสดงข้อมูล subplang ด้วย username, plang_id, subplang_id "
    #swagger.description = "แสดงข้อมูล subplang ด้วย username, plang_id, subplang_id <br>
    ค้นหาข้อมูล subplang โดย search จากคอลัมน์ที่กำหนดได้อย่างใดอย่างหนึ่งเท่านั้น คือ<br>
    <br>

    - search_username: ถ้าต้องการแสดง subplang ของ serch_username<br>
    - search_plang_id : ถ้าต้องการแสดงว่า แปลง นี้มี subplang อะไรบ้าง <br>
    - search_subplang_id : ถ้าต้องการข้อมูลของ subplang_id นั้น <br>
    - ถ้าไม่ส่ง search มาเลย จะแสดง subplang ของ userคนนี้ที่ login อยู่<br><br>
    คิดว่าที่จะได้ใช้จริง ๆ คือ search_plang_id เพื่อแสดงข้อมู subplang ของแปลงนั้น ๆ
    "
  */ 
      try {
        const data = {
          search_username:      req.query.search_username,
          search_plang_id:      req.query.search_plang_id,
          search_subplang_id:   req.query.search_subplang_id,
          username:             req.username,
        }
  
        const result = await selectSubplangService(data);
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
export async function selectSubplangPictureController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "select รูปภาพของ subplang by subplang_id "
    #swagger.description = "select รูปภาพของsubplang by subplang_id <br>"
  
  */ 
      try {
        const data = {
          subplang_id:     req.query.subplang_id,
        }
  
        const result = await selectSubplangPictureService(data);
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
export async function selectSubplangCountActivityController(req, res, next) {
  /*#swagger.tags = ['Subplang'],
    #swagger.summary = "นับจำนวน activity by Subplang_id (ปลูกพืช, เลี้ยงสัตว์)"
    #swagger.description = "นับจำนวน activity by Subplang_id (ปลูกพืช, เลี้ยงสัตว์) <br>"
  
  */ 
      try {
        const data = {
          subplang_id:     req.params.subplang_id,
        }
  
        const result = await selectSubplangCountActivityService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
    
 