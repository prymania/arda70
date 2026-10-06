
import { setLogger } from "../../utils/logger.util.js";
import { getAttachedFile, handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import {
  deleteAlertService,
  insertAlertService, selectAlertOfficerService, selectAlertService, selectAnnouncementAlertService, 
  selectResponseAlertService,
  updateAlertService

} from "./alert.js";


/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertAlertController(req, res, next) {
  /*#swagger.tags = ['Alert'],
    #swagger.summary = "เพิ่ม ข้อมูล Alert ทั้งจากเกษตกร และ เกษตรอำเภอ"
    #swagger.description = "เพิ่ม ข้อมูล Alert ทั้งจากเกษตกร และ เกษตรอำเภอ<br>
    <br> alert_type คือบอกว่าเป็น alert เกี่ยวกับอะไร เป็นได้ 4 อย่างคือ -  พืช, สัตว์, ภัยพิบัติ, อื่น ๆ
    <br>
    <br> aleart_enddate ให้ส่งมาเฉพาะกรณีคนส่ง alert คือ เกษตรอำเภอ ว่าต้องการให้แสดงข้อความถึงวันไหน
    <br> กรณีคนส่งเป็น เกษตรกร ไม่ต้องใส่ enddate และจะเก็บค่าเป็น NULL

    <br> response_to  คือ  array ของ alert_id ที่ต้องการตอบกลับ 
    <br> 1. กรณีคนส่ง alert คือเกษตรกร  ไม่ต้องส่ง response_to มา
    <br> 2. กรณีคนส่ง alert คือเกษตรอำเภอ (เป็นการตอบกลับ alert_id ของเกษตรกร)
    <br> ให้ส่ง response_to เป็น array of alert_id ที่ต้องการตอบกลับ เช่น [1,2,6,9]
    <br> 3. กรณีเกษตรอำเภอ ต้องการส่ง alert ให้เกษตรกรทุกคน (เช่นการประกาศข่าว) ไม่ต้องส่ง response_to
    <br> แต่ให้ส่ง announcement เป็น 1
    <br>
    <br> announcement  = 1 ส่งมาเฉพาะกรณีเกษตรอำเภอ ต้องการส่ง alert ให้เกษตรกรทุกคน (เช่นการประกาศข่าว)
    "

    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }
 
  */ 
      try {
// Note to prymania:  ถ้ามีการ upload file ต้องใช้ req.query นะ ใช้ req.body ไม่ได้ มันโหลดไม่ได้ 
// แต่ใน Postman  ให้ส่งจาก Params (query params) เลย
// response_to เพื่อเอาไปหา alert_id เพื่อ update column response_id นะ     
        const filepath = await handleAttachedFile(req, req.username, 'alert')
        const data = {
            username:          req.username
            ,alert_enddate:    req.query.alert_enddate
            ,alert_type:       req.query.alert_type
            ,detail:           req.query.detail
            ,response_to:      req.query.response_to
            ,announcement:     req.query.announcement
            ,filepath:         filepath
          }
          
          console.log(data);
          
        const result = await insertAlertService(data);
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
export async function updateAlertController(req, res, next) {
  /*#swagger.tags = ['Alert'],
  #swagger.summary = "edit ข้อมูล Alert ทั้งจากเกษตกร และ เกษตรอำเภอ by alert_id"
  #swagger.description = "edit ข้อมูล Alert ทั้งจากเกษตกร และ เกษตรอำเภอ <br>
  แก้ไขแค่ enddate, type, detail, announcement
  <br> alert_type คือบอกว่าเป็น alert เกี่ยวกับอะไร เป็นได้ 6 อย่างคือ -  พืช, สัตว์, ภัยแล้ง, น้ำท่วม, ภัยพิบัติอื่น ๆ, อื่น ๆ
  "

    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }
*/ 
    try {
      const filepath = await handleAttachedFile(req, req.username, 'alert')
      const data = {
          alert_id:          req.query.alert_id
          ,alert_enddate:    req.query.alert_enddate
          ,alert_type:       req.query.alert_type
          ,detail:           req.query.detail
          ,announcement:     req.query.announcement
          ,filepath:         filepath
        }

      const result = await updateAlertService(data);
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
export async function selectAlertController(req, res, next) {
  /*#swagger.tags = ['Alert'],
    #swagger.summary = "แสดงข้อมูล Alert ที่ ตัวเองเป็นคนส่ง "
    #swagger.description = " แสดงข้อมูล Alert ที่ ตัวเองเป็นคนส่ง 
    <br><br>
    "
  
  */ 
      try {
        
        const data = {
          username:     req.username
        }
  
        const result = await selectAlertService(data);
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
export async function selectAnnouncementAlertController(req, res, next) {
  /*#swagger.tags = ['Alert'],
    #swagger.summary = "แสดงข้อมูล Alert ที่เป็น announcement จาก เกษตรอำเภอ (address code เดียวกันกับ เกษตรกร)"
    #swagger.description = " แสดงข้อมูล Alert ที่เป็น announcement จาก เกษตรอำเภอ<br><br>

    <br>แสดงข่าวประกาศจากเกษตรอำเภอ โดยแสดงเฉพาะข่าวที่ถึงวัน alert_enddate
    <br>
    return:  ALERT.* และ officer_name , officer.user_role ของเกษตรอำเภอ ที่เป็นคนประกาศข่าว
    "
  */ 
      try {
        
        const data = {
          username:         req.username,
          address_code:     req.address_code
        }
  
        const result = await selectAnnouncementAlertService(data);
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
export async function selectResponseAlertController(req, res, next) {
  /*#swagger.tags = ['Alert'],
    #swagger.summary = "แสดงข้อมูลที่เกษตรอำเภอ reply to alert_id นั้น ๆ"
    #swagger.description = " แสดงข้อมูลที่เกษตรอำเภอ reply to alert_id นั้น ๆ<br>
    <br>

    "
  */
  try {
    
    const data = {
      alert_id:     req.query.alert_id
    }

    const result = await selectResponseAlertService(data);
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
export async function selectAlertOfficerController(req, res, next) {
/*#swagger.tags = ['Alert'],
    #swagger.summary = "Officer แสดงข้อมูลร้องทุกข์จากเกษตรกรที่อยู่ในอำเภอที่ดูแลอยู่ "
    #swagger.description = " Officer แสดงข้อมูลร้องทุกข์จากเกษตรกรที่อยู่ในอำเภอที่ดูแลอยู่<br><br>

    แสดงข้อความร้องทุกข์จากเกษตรกร ที่อยู่ในอำเภอที่ เกษตรอำเภอคนนี้ดูแลอยู่<br>
    โดยเรียงลำดับการแสดงผลข้อมูลตาม<br>
    - ข้อความที่ยังไม่ได้ตอบ<br>
    - alert_id จากล่าสุดไปหาเก่า<br>
"
  */ 
      try {
        
        const data = {
          username:         req.username,
          address_code:     req.address_code
        }
  
        const result = await selectAlertOfficerService(data);
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
export async function deleteAlertController(req, res, next) {
  /*#swagger.tags = ['Alert'],
    #swagger.summary = "Delete ALERT by alert_id "
    #swagger.description = "Delete ALERT by alert_id <br>"
  
  */ 
      try {
        const data = {
          alert_id:     req.query.alert_id,
        }
  
        const result = await deleteAlertService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
    
 