
import { setLogger } from "../../utils/logger.util.js";
import { handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { deletePlangPictureService, deletePlangService, 
  deleteWaterSourceService, 
  deleteWaterSupplyService, 
  insertPlangPictureService, 
  insertPlangService, 
  insertSoilMeterService, 
  insertWaterSourceService, 
  insertWaterSupplyService, 
  selectPlangCountDetailService, 
  selectPlangPictureService, 
  selectPlangService, 
  selectSoilMeterService, 
  selectWaterSourceService, 
  selectWaterSupplyService, 
  updatePlangService } from "./plang.js";

const logger = setLogger(import.meta.url);



/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertPlangController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "เพิ่ม ข้อมูลแปลงของเกษตกร User "
    #swagger.description = "เพิ่ม ข้อมูลแปลงของเกษตกร (ของตัวเอง)  <br><br> 

    === กรณีของ address_code ===   <br>
    คิดเผื่ออนาคตว่า อาจจะมีแปลงที่ ที่อยู่ ไม่เหมือนกับ ที่อยู่เกษตรกร   <br>
    ทำให้ address_code ของแปลง ไม่เหมือนกับของเกษตรกร   <br>
    ดังนั้น ถ้ามีการใส่ทึ่อยู่แปลง ให้ส่ง plang_address_code มาด้วย   <br>
    แต่ถ้าไม่ส่ง plang_address_code มา จะใช้ address_code เดียวกับเกษตรกร   <br><br>
    
    <br> own_type เก็บเป็นข้อความเลย ไม่ได้เก็บแยก table
    <br> water_supply และ water_source เก็บแยก table
    <br> ดังนั้นต้องเรียกเส้นแยกเพื่อเพิ่มข้อมูล water_supply, water_source
    "
  
  */ 
      try {
        
        const data = {
          address_code:         req.address_code,
          username:             req.username,
          plang_address_code:   req.body.plang_address_code,
          lat_long:     req.body.lat_long,
          center:       req.body.center,
          msquare:      req.body.msquare,
          rai:          req.body.rai,
          ngan:         req.body.ngan,
          wa:           req.body.wa,
          moo:          req.body.moo,
          village:      req.body.village,
          road:         req.body.road,
          subdistrict:  req.body.subdistrict,
          district:     req.body.district,
          province:     req.body.province,
          plang_name:   req.body.plang_name,
          title_deed:   req.body.title_deed,
          own_type:     req.body.own_type,
          detail:       req.body.detail
        }
  
        const result = await insertPlangService(data);
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
export async function insertWaterSupplyController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "เพิ่ม ข้อมูล Water Supply (แหล่งน้ำ) by plang_id"
    #swagger.description = "เพิ่ม ข้อมูล Water Supply by plang_id<br>
    
    <br> เพิ่ม water supply ได้ทีละอย่าง 
    <br>  supply_type มีได้แค่ 2 อย่างคือ บ่อจิ๋ว  หรือ น้ำบาดาล  (เท่าเป็น drop down ให้เลือก)
    "
  
  */ 
      try {
        
        const data = {
          address_code:   req.address_code,
          plang_id:       req.body.plang_id,
          supply_type:    req.body.supply_type,
          width:          req.body.width,
          depth:          req.body.depth,
          water_depth:    req.body.water_depth,
          detail:         req.body.detail
        }
  
        const result = await insertWaterSupplyService(data);
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
export async function insertWaterSourceController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "เพิ่ม ข้อมูล Water Source (แหล่งน้ำธรรมชาติ)by plang_id"
    #swagger.description = "เพิ่ม ข้อมูล Water Source by plang_id<br>
    
    <br> เพิ่ม water source ได้ทีละอย่าง 
    <br>  source_type เป้นอะไรก็ได้ เช่น ห้วย หนอง คลอง บึง แม่น้ำ 
    "
  
  */ 
      try {
        
        const data = {
          address_code:   req.address_code,
          plang_id:       req.body.plang_id,
          source_type:    req.body.source_type,
          source_name:    req.body.source_name,
          width:          req.body.width,
          depth:          req.body.depth,
          water_depth:    req.body.water_depth,
          detail:         req.body.detail
        }
  
        const result = await insertWaterSourceService(data);
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
export async function insertPlangPictureController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "เพิ่มรูปภาพแปลง by plang_id "
    #swagger.description = "เพิ่มรูปภาพแปลง by plang_id  <br>
   "
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }
  
  */ 
      try {
        const filepath = await handleAttachedFile(req, req.username, 'plang')
        const data = {
          username:     req.username,
          plang_id:     req.query.plang_id,
          detail:       req.query.detail,
          filepath:     filepath
        }

        console.log(data);
        
        const result = await insertPlangPictureService(data);
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
export async function updatePlangController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "edit ข้อมูลแปลงของเกษตกร by plang_id "
    #swagger.description = "edit ข้อมูลแปลงของเกษตกร  <br>
    <br><br>
    --หมายเหตุ ทิ้ง ๆ ไว้หน่อย ถ้าต่อไปมีแบบ ที่อยู่แปลง ไม่เหมือนที่อยู่ user จะต้องส่ง address_code มา--  <br>
    แต่ตอนนี้ ไม่ต้องส่งมา เพื่อป้องกัน address_code ผิดพลาด <br>
    (ใช้ address_code จาก JWT)"
  
  */ 
      try {
        const data = {
          address_code: req.address_code,
          plang_id:     req.body.plang_id,
          lat_long:     req.body.lat_long,
          center:       req.body.center,
          msquare:      req.body.msquare,
          rai:          req.body.rai,
          ngan:         req.body.ngan,
          wa:           req.body.wa,
          moo:          req.body.moo,
          village:      req.body.village,
          road:         req.body.road,
          subdistrict:  req.body.subdistrict,
          district:     req.body.district,
          province:     req.body.province,
          plang_name:   req.body.plang_name,
          title_deed:   req.body.title_deed,
          own_type:     req.body.own_type,
          detail:       req.body.detail
        }
  
        const result = await updatePlangService(data);
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
export async function deletePlangController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "Delete ข้อมูลแปลงของเกษตกร by plang_id "
    #swagger.description = "Delete ข้อมูลแปลงของเกษตกร by plang_id <br>"
  
  */ 
    try {
      const data = {
        plang_id:     req.query.plang_id,
      }

      const result = await deletePlangService(data);
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
export async function deletePlangPictureController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "Delete  plang picture by picture_id "
    #swagger.description = "Delete  plang picture by picture_id <br>"
  
  */ 
      try {
        const data = {
          picture_id:     req.query.picture_id
        }
  
        const result = await deletePlangPictureService(data);
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
export async function selectPlangController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "select ข้อมูลแปลงของ User ด้วย username, search_username, plang_id",
    #swagger.description = "select ข้อมูลแปลงของ User ด้วย username, search_username, plang_id<br>
    ค้นหาข้อมูล Plang โดย search จากคอลัมน์ที่กำหนดได้อย่างใดอย่างหนึ่งเท่านั้น คือ<br><br>
    
    - search_username : แสดงแปลงทั้งหมดของ search_username (user คนอื่น) <br>
    - search_plang_id : แสดงข้อมูลของแปลง plang_id นี้ <br>
    - ถ้าไม่มี search จะแสดงข้อมูลแปลงทั้งหมดของ user ตัวเอง<br>"
  */ 
      try {
        
        const data = {
          search_username:     req.query.search_username,
          search_plang_id:     req.query.search_plang_id,
          username:            req.username 
        }
  
        const result = await selectPlangService(data);
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
export async function selectWaterSupplyController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "select ข้อมูล water_supply by plang_id"
    #swagger.description = "select ข้อมูล water_supply by plang_id<br>
    <br>"
  
  */ 
      try {
        
        const data = {
          plang_id:     req.query.plang_id,
        }
  
        const result = await selectWaterSupplyService(data);
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
export async function selectWaterSourceController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "select ข้อมูล water_source by plang_id"
    #swagger.description = "select ข้อมูล water_source by plang_id<br>
    <br>"
  
  */ 
      try {
        const data = {
          plang_id:     req.query.plang_id,
        }
        const result = await selectWaterSourceService(data);
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
export async function selectPlangPictureController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "select รูปภาพของแปลง by plang_id "
    #swagger.description = "select รูปภาพของแปลง by plang_id <br>"
  
  */ 
      try {
        const data = {
          plang_id:     req.query.plang_id,
        }
  
        const result = await selectPlangPictureService(data);
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
export async function selectPlangCountDetailController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "นับจำนวน detail by plang_id (ปลูกพืช, เลี้ยงสัตว์, subplang, disaster)"
    #swagger.description = "นับจำนวน activity by plang_id (ปลูกพืช, เลี้ยงสัตว์, subplang, disaster) <br>"
  
  */ 
      try {
        const data = {
          plang_id:     req.params.plang_id,
        }
  
        const result = await selectPlangCountDetailService(data);
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
export async function deleteWaterSourceController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "Delete ข้อมูล water source(แหล่งน้ำธรรมชาติ)  by wid "
    #swagger.description = "Delete ข้อมูล water source by wid <br>"
  
  */ 
    try {
      const data = {
        wid:     req.query.wid,
      }

      const result = await deleteWaterSourceService(data);
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
export async function deleteWaterSupplyController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "Delete ข้อมูล water supply(แหล่งน้ำของตัวเอง)  by wid "
    #swagger.description = "Delete ข้อมูล water supply by wid <br>"
  
  */ 
    try {
      const data = {
        wid:     req.query.wid,
      }

      const result = await deleteWaterSupplyService(data);
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
export async function insertSoilMeterController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "เพิ่มข้อมูล SoilMeter ข้อมูลดินจากเสาวัด by plang_id"
    #swagger.description = "เพิ่ม ข้อมูล SoilMeter ข้อมูลดินจากเสาวัด by plang_id<br>
    
    <br> เพิ่มข้อมูลดิน 7 ค่า จากที่อ่านได้จากเสาวัด คือ soil, t, ph, ec, n, p, k
    <br> detail เผื่ออยากใส่ข้อมูลอื่น ๆ
    "
  
  */ 
      try {
        
        const data = {
          plang_id:   req.body.plang_id,
          soil:       req.body.soil   || 0,
          t:          req.body.t      || 0,
          ph:         req.body.ph     || 0,
          ec:         req.body.ec     || 0,
          n:          req.body.n      || 0,
          p:          req.body.p      || 0,
          k:          req.body.k      || 0,
          detail:     req.body.detail || ''
        }
  
        const result = await insertSoilMeterService(data);
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
export async function selectSoilMeterController(req, res, next) {
  /*#swagger.tags = ['Plang'],
    #swagger.summary = "select ข้อมูล SOIL METER ด้วย plang_id",
    #swagger.description = "select ข้อมูล SOIL METER ด้วย plang_id<br>
    แสดงข้อมูล soil meter ทั้งหมดของ plang_id นั้น ๆ เรียงลำดับที่ใหม่ที่สุด<br><br>
    "
  */ 
      try {
        
        const data = {
          search_plang_id:     req.query.search_plang_id
        }
  
        const result = await selectSoilMeterService(data);
        return next(result);
      } catch (error) {
        return next(error);
      }
    }
        