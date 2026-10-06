
import { setLogger } from "../../utils/logger.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { 
  selectNDVIService,
  selectPlantsService,
  selectSPIService,
  selectSRIService,
  selectSSIService,
  selectSoilLocationService,
  selectStationService,
  selectWDIService, 
  } from "./forecast.js";

const logger = setLogger(import.meta.url);



/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectStationController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.security = []
    #swagger.summary = "สร้างไว้ทดสอบ ไม่มีเรียกใช้ select station ของ  user "
    #swagger.description = " select station ที่ใกล้ที่สุด ของ  user  <br>
    - โดยดูจาก address_code ของ user  <br>
    - station type :<br><br>
    1 - Hydrology   อุทกวิทยา   ปริมาณน้ำท่า      SRI model<br>
    2 - Meteorology อุตุนิยมวิทยา ปริมาณน้ำฝน      SPI , SPEI model <br>
    3 - Satellite   ดาวเทียม    ดัชนีความแห้งแล้ง  NDVI, SSI model"<br>

    #swagger.parameters['search_username'] = {
      in: 'query',
      description: 'username ที่ต้องการค้นหา',
      required: false,
      type: 'string',
      default: ''
    }
    #swagger.parameters['address_code'] = {
        in: 'query',
        description: 'address_code ที่ต้องการค้นหา',
        required: false,
        type: 'string',
        default: ''
    }
  */ 
      try {
        
        const data = {
          search_username:    req.query.search_username,
          address_code:       req.query.address_code
        }
  
        const result = await selectStationService(data);
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
export async function selectSPIController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดง SPI forecast ของ  user หรือของแปลงเกษตร"
    #swagger.description = "แสดง SPI forecast ของ  user หรือของแปลงเกษตร <br><br>
    
    SPI forcast  อุตุนิยมวิทยา ดัชนีปริมาณน้ำฝน <br> 
    แสดงข้อมูลเป็นราย 10 วัน โดยดูจากวันนี้ return 9 ค่า <br> 
    (นับจากวันนี้ไป 3 เดือน--ต่อไปอาจแสดงมากกว่านี้)<br> 
    rank = 1 คือวันที่ 1-10 <br> 
    rank = 2 คือวันที่ 11-20 <br> 
    rank = 3 คือวันที่ 21-30 <br> <br> 
    
    value คือค่าที่ได้ นำไปแปลงเป็นคำปริมาณน้ำฝน, มาก ... <br> 
    
    - forecast ค่าจาก station ที่ใกล้ที่สุด<br> 
    - ส่ง lat, long มา จะเลือก station ที่ใกล้ที่สุดจาก lat, long นั้น<br> 
    ซึ่งบาง station อาจจะไม่มีค่าก็ได้<br> 
     
    <br>"
  */ 
      try {
        
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
  
        const result = await selectSPIService(data);
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
export async function selectSRIController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดง SRI forecast ของ  user หรือของแปลงเกษตร"
    #swagger.description = "แสดง SRI forecast ของ  user หรือของแปลงเกษตร <br>
   
    SRI forcast  อุทกวิทยา ปริมาณน้ำท่า <br> 
    แสดงข้อมูลเป็นราย 10 วัน โดยดูจากวันนี้ return 9 ค่า <br> 
    (นับจากวันนี้ไป 3 เดือน--ต่อไปอาจแสดงมากกว่านี้ตอนนี้ข้อมูลมีแค่นี้)<br> 
    rank = 1 คือวันที่ 1-10 <br> 
    rank = 2 คือวันที่ 11-20 <br> 
    rank = 3 คือวันที่ 21-30 <br> <br> 
    
    value คือค่าที่ได้ นำไปแปลงเป็นปริมาณน้ำท่า มากที่สุด, มาก ... <br> 
    
    - forecast ค่าจาก station ที่ใกล้ที่สุด<br> 
    ส่ง lat, long มา จะเลือก station ที่ใกล้ที่สุดจาก lat, long นั้น<br> 
    ซึ่งบาง station อาจจะไม่มีค่าก็ได้<br> 
     
    <br>"
  */ 
      try {
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
        const result = await selectSRIService(data);
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
export async function selectSSIController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดง SSI forecast ของ  user หรือของแปลงเกษตร"
    #swagger.description = "แสดง SPI forecast ของ  user หรือของแปลงเกษตร <br>
    
    SSI forcast  จากดาวเทียม ความชื้นในดิน-ความแห้งแล้ง <br> 
    แสดงข้อมูลเป็นราย 10 วัน โดยดูจากวันนี้ return 9 ค่า <br> 
    (นับจากวันนี้ไป 3 เดือน--ต่อไปอาจแสดงมากกว่านี้ตอนนี้ข้อมูลมีแค่นี้)<br> 
    rank = 1 คือวันที่ 1-10 <br> 
    rank = 2 คือวันที่ 11-20 <br> 
    rank = 3 คือวันที่ 21-30 <br> <br> 
    
    value คือค่าที่ได้ นำไปแปลงเป็นคำว่า ความชื้นมาก, แห้งแล้งมาก, ... <br> 
    
    - forecast ค่าจาก station ที่ใกล้ที่สุด<br> 
      ส่ง lat, long มา จะเลือก station ที่ใกล้ที่สุดจาก lat, long นั้น<br> 
    ซึ่งบาง station อาจจะไม่มีค่าก็ได้<br> 
     
    <br>"
  */ 
      try {
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
        const result = await selectSSIService(data);
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
export async function selectNDVIController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดง NDVI forecast ของ  user หรือของแปลงเกษตร"
    #swagger.description = "แสดง NDVI forecast ของ  user หรือของแปลงเกษตร <br>
    
    NDVI forcast  จากดาวเทียม ดัชนีความแห้งแล้ง <br><br>
    ----- แตกต่างจาก indexอื่น ๆคือผลเป็นรายเดือน ไม่ใช่ราย 10 วัน -------<br> 

    
    value คือค่าที่ได้ นำไปแปลงเป็นคำว่า ไม่แห้งแล้ง, แห้งแล้งรุนแรง ... <br> 
    
    - forecast ค่าจาก station ที่ใกล้ที่สุด<br> 
    ส่ง lat, long มา จะเลือก station ที่ใกล้ที่สุดจาก lat, long นั้น<br> 
    ซึ่งบาง station อาจจะไม่มีค่าก็ได้<br> 
     
    <br>"
  */ 
      try {
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
        const result = await selectNDVIService(data);
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
export async function selectWDIController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดง WDI forecast ของ  user หรือของแปลงเกษตร"
    #swagger.description = "แสดง WDI forecast ของ  user หรือของแปลงเกษตร <br>

    WDI - Water Drough Index ตามลุ่มแม่น้ำ โขง ชี มูล  บอกความแห้งแล้ว<br> 
    แสดงข้อมูลเป็นราย 10 วัน โดยดูจากวันนี้ return 10 ค่า <br> 
    (นับจากวันนี้ไป 3 เดือน--)<br> 
    rank = 1 คือวันที่ 1-10 <br> 
    rank = 2 คือวันที่ 11-20 <br> 
    rank = 3 คือวันที่ 21-30 <br> <br> 
    
    value คือค่าที่ได้ นำไปแปลงเป็นคำว่า แล้งมาก, แล้งปานกลาง , แล้งน้อย, ไม่แล้ง <br> 

    rivel  คือลุ่มแม่น้ำของ locationนั้น ๆ เพื่อนำไปแสดงผล เช่น<br> 
    ดัชนีความแล้งระดับลุ่มน้ำ (ลุ่มน้ำขี)<br> <br> 
    
    - forecast ค่าจาก station ที่ใกล้ที่สุด<br> 
    ส่ง lat, long มา จะเลือก station ที่ใกล้ที่สุดจาก lat, long นั้น<br> 
    ซึ่งบาง station อาจจะไม่มีค่าก็ได้<br> 
     
    <br>"
  */ 
      try {
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
        const result = await selectWDIService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
   


    
// หน้าอากาศวันนี้**********************************************
// *********************************************************

/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectSoilLocationController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดง ข้อมูลดินของแปลงเกษตร ตาม lat, long"
    #swagger.description = "แสดง ข้อมูลดินของแปลงเกษตร ตาม lat, long <br>
   <br> 
     แสดงข้อมูลดินในapp หน้าแรก(อากาศวันนี้)<br>
     ข้อมูลที่ return แต่ละคอลัมน์คือ<br>
     soil_group - กลุ่มชุดดิน<br>
     soil_aka - ชื่อชุดดินตัวย่อ<br>
     soil_name - ชื่อชุดดิน<br>
     soil_fertility - ความอุดมสมบูรณ์ของดิน<br>
     soil_ph - ค่าความเป็นกรด-ด่างของเนื้อดิน<br>
     soil_texture -  ลักษณะเนื้อดิน<br>
     suitable_plant - พืชที่เหมาะสมกับการเพาะปลูก<br>
     soil_property - คุณสมบัติของดิน<br>
     plantArray - เหมือนกันกับ suitable_plant แค่แยกเป็น array ให้เฉย ๆ ถ้าไม่มีแสดงรูป ใช้ suitable_plant เลยก็ได้<br>

    <br>"
  */ 
      try {
        
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
        const result = await selectSoilLocationService(data);
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
export async function selectPlantsController(req, res, next) {
  /*#swagger.tags = ['FORECAST'],
    #swagger.summary = "แสดงพืชที่เหมาะสมในการเพาะปลูก"
    #swagger.description = "แสดงแสดงพืชที่เหมาะสมในการเพาะปลูก  <br><br>
    
    โดยดูจาก SPI index ของวันนั้น ๆ  <br> 
   
    - forecast ค่าจาก station ที่ใกล้ที่สุด<br> 
    - ส่ง lat, long มา จะเลือก station ที่ใกล้ที่สุดจาก lat, long นั้น<br> 
    ซึ่งบาง station อาจจะไม่มีค่าก็ได้<br> 
     
    <br>"
  */ 
      try {
        
        const data = {
          username:           req.username,
          latitude:           req.query.latitude,
          longitude:          req.query.longitude
        }
  
        const result = await selectPlantsService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
       