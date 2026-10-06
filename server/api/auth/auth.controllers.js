import { changePasswordService, loginService, logoutService, 
   registerService, 
   registerStaffService} from "./auth.js";
import { hashData } from "../../utils/command.util.js";
import { setLogger } from "../../utils/logger.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { USER_AGENT_DEVICE } from "../../constants/paramiter.cont.js";

const logger = setLogger(import.meta.url);

  
/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */

export async function registerController(req, res, next) {
  /*#swagger.tags = ['Auth'],
    #swagger.security = []
    #swagger.summary = "Register เกษตรกร- ประชาชนทั่วไป",
    #swagger.description = "Register new user <br>
  
  <br> - user_role: 
      ROLE_GENERAL          = 1   ผู้ใช้งานทั่วไป   <br>
      ROLE_FARMER           = 2   เกษตกร<br>
      ROLE_HEAD_CE          = 3   หัวหน้าวิสาหกิจชุมชุน หรือ ผู้นำชุมชน<br>
      ROLE_SUBDISTRICT_OFFICIER   = 4   อบต. หรือ จนท ระดับตำบล<br>
      ROLE_DISTRICT_OFFICER = 5   จนท. ระดับอำเภอ<br>
      ROLE_PROVINCE_OFFICER = 6   จนท. ระดับจังหวัด<br>
      ROLE_SE               = 7   วิสาหกิจชุมชน<br>
      ROLE_ADMIN            = 9   admin<br>
  
  
      <br>หลังจาก register แล้ว ต้องเรียก POST /v1/user/user_detail เพื่อเพิ่ม detail ให้ new user"
      
    */  
   
    try {
      const data = {
        username:   req.body.username,
        password:   req.body.password,
        user_role:  req.body.user_role,
        ip:         req.ip,
        device:     req.get(USER_AGENT_DEVICE)
      }
      console.log(data);
      const result = await registerService(data);
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
export async function registerStaffController(req, res, next) {
/*#swagger.tags = ['Auth'],
  #swagger.security = []
  #swagger.summary = "Register เจ้าหน้าที่",
  #swagger.description = "Register เจ้าหน้าที่ ใส่ user detail ไปด้วยเลย<br>

  <br><br> -- ต้องส่ง address_code ที่ถูกต้องมาด้วย --
  <br><br> - gender เป็น M, F, U
  <br><br> - consent เป็น  0 ถ้ายังไม่ยินยอม หรือ 1  ถ้ายินยอม

  <br><br> - user_role: ใส่เป็น array เช่น [4] <br>
    ROLE_GENERAL          = 1   ผู้ใช้งานทั่วไป   <br>
    ROLE_FARMER           = 2   เกษตกร<br>
    ROLE_HEAD_CE          = 3   หัวหน้าวิสาหกิจชุมชุน หรือ ผู้นำชุมชน<br>
    ROLE_SUBDISTRICT_OFFICIER   = 4   อบต. หรือ จนท ระดับตำบล<br>
    ROLE_DISTRICT_OFFICER = 5   จนท. ระดับอำเภอ<br>
    ROLE_PROVINCE_OFFICER = 6   จนท. ระดับจังหวัด<br>
    ROLE_SE               = 7   วิสาหกิจชุมชน<br>
    ROLE_ADMIN            = 9   admin<br>

    <br> ให้ใส่ detail เจ้าหน้าที่ไปในเส้นนี้เลย
    <br> ดังนั้น ไม่จำเป็นต้องเรียก POST /v1/user/user_detail เพื่อเพิ่ม detail ให้ new user -- ต่างจาก register เกษตกร"
    
  */    
  try {
    const data = {
            // เพิ่ม user_detail ไปด้วยเลย เพราะ กรณีลงทะเบียน จนท ต้องให้ admin approve
      username:   req.body.username,
      password:   req.body.password,
      user_role:  req.body.user_role,
          address_code:   req.body.address_code,
          title:          req.body.title    || "",
          name:           req.body.name     || "",
          surname:        req.body.surname    || "",
          email:          req.body.email      || "",
          idcard:         req.body.idcard     || "",
          gender:         req.body.gender     || "U",
          birthday:       req.body.birthday   || null,
          subdistrict:    req.body.subdistrict|| "",
          district:       req.body.district   || "",
          province:       req.body.province   || "",
          post:           req.body.post       || "",
          phone:          req.body.phone      || "",
          info:           req.body.info       || "",
          position:       req.body.position   || "",
          company:        req.body.company    || "",
          consent:        req.body.consent    || 0,
      ip:         req.ip,
      device:     req.get(USER_AGENT_DEVICE)
    }
    console.log(data);
    const result = await registerStaffService(data);
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
export async function loginController(req,res,next){
/*#swagger.tags = ['Auth'],
  #swagger.security = []
  #swagger.summary = "Login"

  #swagger.responses[200] = { 
  schema: { 
  "$ref": "#/definitions/LoginSuccess" },
  description: "successfully." }
*/ 
  try {
    const data = {
      username:   req.body.username,
      password:   req.body.password,
      ip:         req.ip,
      device:     req.get(USER_AGENT_DEVICE)
    };
    const result=await loginService(data)
    return next(result)
   } catch (error) {
    return next(error);
   } 
}
/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function logoutController(req,res,next){
/*#swagger.tags = ['Auth'],
  #swagger.summary = "Logout"

  #swagger.responses[200] = { 
  schema: { 
  "$ref": "#/definitions/Token" },
  description: "successfully." }
*/   
   try {
    const data = { 
      username:         req.username, 
      login_uuid:       req.login_uuid 
    };
    const result=await logoutService(data)
    return next(result)
   } catch (error) {
    return next(error);
   } 
}

/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function changePasswordController(req, res, next) {
  /*#swagger.tags = ['Auth'],
    #swagger.summary = "Change password"
    #swagger.description = "<b>Change password </b>",
  
    #swagger.responses[200] = { 
    schema: { 
    "$ref": "#/definitions/Token" },
    description: "successfully." }
  */  
    try {
      const data = {
        username :              req.username,
        new_password:           req.body.new_password,
      }
      const result = await changePasswordService(data);
      return next(result);
    } catch (error) {
      return next(error);
    }
  }


 /********************************************** */
