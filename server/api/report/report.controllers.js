
import { setLogger } from "../../utils/logger.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { selectAllFarmerInDistrictReportService, 
  selectDistrictOverviewService, 
  selectFarmerInSubdistrictReportService, 
  selectPlangReportService, 
  selectSubdistrictOverviewService} from "./report.js";
const logger = setLogger(import.meta.url);


/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectPlangReportController(req, res, next) {
  /*#swagger.tags = ['Report'],
    #swagger.summary = "เกษตรอำเภอ ดูข้อมูล Report (ชุมชน) by เกี่ยวกับแปลงในอำเภอนั้น ๆ ,
    #swagger.description = "เกษตรอำเภอ ดูข้อมูล Report (ชุมชน) by เกี่ยวกับแปลงในอำเภอนั้น ๆ  <br>
    <br><br>

    เส้นนี้ report/plang ข้อมูลที่ report คือ <br>
    - farmer_amount<br>
    - plang_amount <br>
    - rai_amount <br> 
    - rai_activity<br>
    - rai_empty  <br>
    - type_data<br>
    "
  */   

    try {
      const data ={
        username:         req.username,  //คือ username เกษตรอำเภอ 
        address_code:     req.address_code
      }
      const result = await selectPlangReportService(data);
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
export async function selectDistrictOverviewController(req, res, next) {
  /*#swagger.tags = ['Report'],
    #swagger.summary = "เกษตรอำเภอ ดูภาพรวม ในอำเภอนั้น ๆ แยกตาม ตำบล ",
    #swagger.description = "เกษตรอำเภอ ดูภาพรวม ในอำเภอนั้น ๆ แยกตาม ตำบล   <br><br> 

    เรียกเส้นนี้เฉพาะ user ที่มี user_role = 5 (จนท. ระดับอำเภอ) เท่านั้น<br> 
    ข้อมูลที่แสดงคือ<br> 
    - ชื่อตำบล<br> 
    - รหัสตำบล  (subdistrict_addresscode) ต้องส่งค่านี้ไปเส้น API ต่อไป เพื่อดูเกษตรกรแต่ละรายในตำบลนั้นๆ<br> 
    - จำนวนเกษตรกรในตำบลน้น<br> 
    - จำวนแปลง<br> 
    - จำนวนไร่<br> 
    พวก จำนวน ถ้าไม่มีข้อมูลใน database จะ return 0 <br>  "
    
  */   

    try {
      const data ={
        username:         req.username,
        address_code:     req.address_code,
        user_role:        req.query.user_role
      }
      
      const result = await selectDistrictOverviewService(data);
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
export async function selectSubdistrictOverviewController(req, res, next) {
  /*#swagger.tags = ['Report'],
    #swagger.summary = "จนท. ระดับตำบล ดูภาพรวม ในตำบลนั้น ๆ  ",
    #swagger.description = "จนท. ระดับตำบล  ดูภาพรวม ในตำบลนั้น ๆ  <br><br> 

    เรียกเส้นนี้เฉพาะ user ที่มี user_role = 4 (จนท. ระดับตำบล) เท่านั้น<br> 
    ข้อมูลที่แสดงคือ<br> 
    - ชื่อตำบล<br> 
    - จำนวนเกษตรกรในตำบลน้น<br> 
    - จำนวนแปลง<br> 
    - จำนวนไร่<br> 
    พวก จำนวน ถ้าไม่มีข้อมูลใน database จะ return 0 <br>  "
    
  */   

    try {
      const data ={
        username:         req.username,
        address_code:     req.address_code,
        user_role:        req.query.user_role
      }
      
      const result = await selectSubdistrictOverviewService(data);
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
export async function selectFarmerInSubdistrictReportController(req, res, next) {
  /*#swagger.tags = ['Report'],
    #swagger.summary = "ดูข้อมูล รายชื่อเกษตรกร ในตำบลนั้น โดยส่ง subdistrict_addresscode ",
    #swagger.description = " ดูข้อมูล รายชื่อเกษตรกร ในตำบลนั้น โดยส่ง subdistrict_addresscode  <br>


    <br> ** ต้องส่ง subdistrict_addcresscode ของตำบลที่ต้องการดูข้อมูลมาด้วยเสมอ<br>
    แสดง
    - ข้อมูลเกษตรกร และ<br> 
    - จำนวนแปลงของเกษตรกรคนนั้น<br> 
    - จำนวนไร่ที่มี<br> 
    <br>  "
    
  */   

    try {
      const data ={
        username:                       req.username,
        subdistrict_addresscode:        req.query.subdistrict_addresscode // prymania front ต้องส่งค่านี้มา เพราะจะเป็นการดูข้อมูลของแต่ละำเภอ
      }
      // console.log(data);
      
      const result = await selectFarmerInSubdistrictReportService(data);
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
export async function selectAllFarmerInDistrictReportController(req, res, next) {
  /*#swagger.tags = ['Report'],
    #swagger.summary = "ดูข้อมูล รายชื่อเกษตรกรทั้งหมดใน อำเภอนั้น ๆ (ไม่ต้องแยกตามตำบล)",
    #swagger.description = " ดูข้อมูล รายชื่อเกษตรกรทั้งหมดใน อำเภอนั้น ๆ (ไม่ต้องแยกตามตำบล) <br>

    แสดง เหมือนที่แสดงแยกตามตำบล แต่อันนี้คือ แสดงทั้งหมดเลย ไม่ต้องกดดูตามตำบล <br>
    - ข้อมูลเกษตรกร และ<br> 
    - จำนวนแปลงของเกษตรกรคนนั้น<br> 
    - จำนวนไร่ที่มี<br> 
    <br>  "
    
  */   

    try {
      const data ={
        username:             req.username,
        address_code:         req.address_code

      }
      const result = await selectAllFarmerInDistrictReportService(data);
      return next(result);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

