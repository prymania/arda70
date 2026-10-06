
import { setLogger } from "../../utils/logger.util.js";
import { handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { deleteActivityPictureService, deleteActivityService, 
  insertActivityPictureService, 
  insertActivityService, 
  selectActivityMasterType1Service, 
  selectActivityMasterType2Service, 
  selectActivityMasterType3Service, 
  selectActivityPictureService, 
  selectActivityService,
  updateActivityService} from "./activity.js";

const logger = setLogger(import.meta.url);



/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertActivityController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "เพิ่ม ข้อมูล activity (การเพาะปลูก/เลี้ยงสัตว์) ของแปลงเกษตร "
    #swagger.description = "เพิ่ม ข้อมูล activity (การเพาะปลูก/เลี้ยงสัตว์) ของแปลงเกษตร <br><br>
    - ต้องระบุ plang_id เสมอ <br>
    - subplang_id ใส่กรณีที่เพิ่ม activity ลงบน subplang ถ้าไม่ใส่ จะให้ค่า subplang_id เป็น null 
    โดย plang_id, subplant_id ต้องสัมพันธ์กัน<br>
    <br>
    type1, type2, type3  ได้จากข้อมูลกิจกรรม 3 ระดับเช่น ประมงน้ำจืด  --> ปลา  --> ปลาทับทิม<br><br>

    pattern, unit ได้จากตอนเรียก API - type3  <br>
    ข้อมูล pattern คือ<br>
    1 - พื้นที่อย่างเดียว <br>
    2 - จำนวนอย่างเดียว <br>
    3 - ทั้งพื้นที่และจำนวน <br>
    4 - จำนวนบ่อ และจำนวนตัวต่อบ่อ (สำหรับ type1 - ประมงน้ำจืด) <br><br>
    
    pond, amount_per_pond  :  ถ้า pattern เป็น 4 (ประมง) ให้ส่ง 2 ค่านี้ และ amount <br>
    UI - พอ user ใส่ บ่อ และจำนวนต่อบ่อ ให้แสดง จำนวนปลาทั้งหมด(amount) ด้วย และส่ง amount มาด้วย <br>
    amount:   ถ้า pattern เป็น 2, 3 ต้องส่ง amount มาด้วย <br><br><br>

    **** หมายเหตุ ****<br>
    ข้อมูลมันเก็บแตกต่างกัน ดังนั้นน่าจะส่งมาทุกคอลัมน์เลย อันไหนไม่มีก็ส่ง0 มา เช่น<br>
    ถ้าปลูกข้าว  ไม่มี amount แต่ก็ส่ง amount เป็น 0 มาเลย น่าจะสะดวกกว่า<br>
     <br>
    "
  
  */ 
      try {
        
        const data = {
          plang_id:           req.body.plang_id,
          subplang_id:        req.body.subplang_id,
          type1:              req.body.type1,
          type2:              req.body.type2,
          type3:              req.body.type3,
          pattern:            req.body.pattern,
          rai:                req.body.rai,
          ngan:               req.body.ngan,
          wa:                 req.body.wa,
          pond:               req.body.pond,
          amount_per_pond:    req.body.amount_per_pond,
          amount:             req.body.amount,
          unit:               req.body.unit,
          start_date:         req.body.start_date,
          end_date:           req.body.end_date,
          detail:             req.body.detail
        }

        console.log(data);
        const result = await insertActivityService(data);
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
export async function insertActivityPictureController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "เพิ่มรูปภาพ activity by activity_id "
    #swagger.description = "เพิ่มรูปภาพ activity by activity_id "
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }    
  */ 
      try {
        const filepath = await handleAttachedFile(req, req.username, 'activity')
        const data = {
          username:     req.username,
          activity_id:  req.query.activity_id,
          detail:       req.query.detail,
          filepath:     filepath
        }

        const result = await insertActivityPictureService(data);
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
export async function updateActivityController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "แก้ไขข้อมูล activity (การเพาะปลูก/เลี้ยงสัตว์) ของแปลงเกษตร "
    #swagger.description = "แก้ไขข้อมูล activity (การเพาะปลูก/เลี้ยงสัตว์) ของแปลงเกษตร <br>
    ใช้แก้ไข กรณีใส่ข้อมูลผิด แล้วอยากแก้ไข หรืออาจจะใส่วันสิ้นสุด activity หรืออื่น ๆ
    <br> ไม่ต้องส่ง plang_id, subplang_id มา เพราะเป็นการแก้ไข activity detail (คือแก้กิจกรรมบนแปลงเดิม)
    <br> ไม่ต้องส่ง action มา เพราะเป็นการแก้ไข activity detail คงไม่มีการแก้จากปลูกข้าวเป็นเผาถ่าน
    <br>  กรณีแบบนั้น ให้ลบทิ้งเพิ่มใหม่
    "
  
  */ 
      try {
        
        const data = {
          activity_id:    req.body.activity_id,
          type1:          req.body.type1,
          type2:          req.body.type2,
          type3:          req.body.type3,
          pattern:        req.body.pattern,
          rai:                req.body.rai,
          ngan:               req.body.ngan,
          wa:                 req.body.wa,
          pond:               req.body.pond,
          amount_per_pond:    req.body.amount_per_pond,
          amount:             req.body.amount,
          unit:               req.body.unit,
          start_date:         req.body.start_date,
          end_date:           req.body.end_date,
          detail:             req.body.detail
        }
  
        const result = await updateActivityService(data);
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
export async function deleteActivityController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "delete activity by activity_id "
    #swagger.description = "delete activity by activity_id  <br>"
  
  */ 
      try {
        
        const data = {
          activity_id:     req.query.activity_id,
        }
  
        const result = await deleteActivityService(data);
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
export async function deleteActivityPictureController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "Delete  Activity picture by picture_id "
    #swagger.description = "Delete  Activity picture by picture_id <br>"
  
  */ 
      try {
        const data = {
          picture_id:     req.query.picture_id,
        }
  
        const result = await deleteActivityPictureService(data);
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
export async function selectActivityController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "select ข้อมูล activity by username, plang_id, subplang_id, activity_id "
    #swagger.description = "select ข้อมูล activity by username, plang_id, subplang_id, activity_id <br>
    <br> ** ใช้ JWT ต่างจากของเดิม <br>
    ค้นหาข้อมูล activity โดย search จากคอลัมน์ที่กำหนดได้อย่างใดอย่างหนึ่งเท่านั้น ตาม priority  คือ<br>
    search_username : ถ้าต้องการแสดงว่า username มี activity  อะไรบ้าง (คือแสดงของ user คนอื่น) <br>
    search_plang_id : ถ้าต้องการแสดงว่า แปลง นี้มี activity อะไรบ้าง <br>
    search_subplang_id : ถ้าต้องการแสดงว่า subplang นี้มี activity อะไรบ้าง<br>
    search_activity_id : ถ้าต้องการแสดงรายละเอียด activity_id นี้คืออะไร <br>
    ถ้าไม่ใส่อะไรมาเลย จะแสดงว่า user ตัวเอง มี activity อะไรบ้าง <br>
    <br>"
  
  */ 
      try {
        
        const data = {
          search_username:     req.query.search_username,
          search_plang_id:     req.query.search_plang_id,
          search_subplang_id:  req.query.search_subplang_id,
          search_activity_id:  req.query.search_activity_id,
          username:            req.username
        }
  
        const result = await selectActivityService(data);
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
export async function selectActivityPictureController(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "select รูปภาพของ Activity by activity_id "
    #swagger.description = "select รูปภาพของ Activity by activity_id <br>"
  
  */ 
      try {
        const data = {
          activity_id:     req.query.activity_id,
        }
  
        const result = await selectActivityPictureService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
   
 
// ACTIVITY_MASTER -----------------------------------------------------
// ---------------------------------------------------------------------

    
/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectActivityMasterType1Controller(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "select ข้อมูล ACTIVITY_MASTER  type1"
    #swagger.description = "select ข้อมูล ACTIVITY_MASTER  type1<br>

    เพื่อเอาไปแสดงบน drop down<br>
    ข้อมูล type1 มี <br>
          ข้าว<br>
          ผัก/สมุนไพร<br>
          พืชไร่<br>
          พืชสวน<br>
          ปศุสัตว์<br>
          ประมงน้ำจืด<br>"
  
  */ 
      try {       
        const data = {

        }
  
        const result = await selectActivityMasterType1Service(data);
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
export async function selectActivityMasterType2Controller(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "select ข้อมูล ACTIVITY_MASTER  type2"
    #swagger.description = "select ข้อมูล ACTIVITY_MASTER  type2<br>

    หลังจากเลือก type1 แล้ว เรียกเส้นนี้ เพื่อเอาไปแสดงบน drop down<br>
    ต้องส่ง type1 มา เพื่อจะได้ประเภทย่อย เช่น ประมงน้ำจืด --> ปลา<br>"
  
  */ 
      try {       
        const data = {
          type1:     req.query.type1,
        }
        const result = await selectActivityMasterType2Service(data);
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
export async function selectActivityMasterType3Controller(req, res, next) {
  /*#swagger.tags = ['Activity'],
    #swagger.summary = "select ข้อมูล ACTIVITY_MASTER  type3"
    #swagger.description = "select ข้อมูล ACTIVITY_MASTER  type3<br>

    หลังจากเลือก type2 แล้ว เรียกเส้นนี้ เพื่อเอาไปแสดงบน drop down<br>
    ต้องส่ง type2 มา เพื่อจะได้ประเภทย่อย เช่น ประมงน้ำจืด --> ปลา --> ปลาทับทิม<br><br>
    return type3, pattern, unit  ไปด้วย เพื่อเอาไปแยกบน UI ว่าจะแสดงอะไร โดย <br>
    pattern <br>
    ข้อมูล pattern คือ<br>
    1 - พื้นที่อย่างเดียว <br>
    2 - จำนวนอย่างเดียว <br>
    3 - ทั้งพื้นที่และจำนวน <br>
    4 - จำนวนบ่อ และจำนวนตัวต่อบ่อ (สำหรับ type1 - ประมงน้ำจืด) <br><br>

    unit คือลักษณะนาม เช่น ตัว ต้น กอ ถาด  ถ้าอันไหนไม่มี unit แสดงว่าเป็นพื้นที่เฉย ๆ <br>
    
    "
  
  */ 
      try {       
        const data = {
          type2:     req.query.type2,
        }
  
        const result = await selectActivityMasterType3Service(data);
        return next(result);
      } catch (error) {
        return next(error);
      }
    }
    