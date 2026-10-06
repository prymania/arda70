
import { USER_AGENT_DEVICE } from "../../constants/paramiter.cont.js";
import { setLogger } from "../../utils/logger.util.js";
import { handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { deleteUserService, insertOrUpdateUserDetailService, insertOrUpdateUserPictureService, 
  
  selectCommunityEnterpriseService, selectCommunityService, 
  selectHeadCommunityEnterpriseService, selectHeadCommunityService, 
  selectUserDetailService,  updateStarFarmerService, updateUserConsentService } from "./user.js";
const logger = setLogger(import.meta.url);



/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertOrUpdateUserDetailController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "เพิ่ม/แก้ไข ข้อมูล User ทุกประเภท "
    #swagger.description = "เพิ่ม/แก้ไข ข้อมูล User ทุกประเภท <br>
    <br>เพิ่ม/แก้ไข ข้อมูล detail  ไม่แก้ username/password แต่ต้องส่ง username/password มาด้วย"
  */ 
      try {
        const data = {
          // address_code:   req.headers.address_code,
          // username:       req.body.username,
          username:       req.username,
          address_code:   req.body.address_code,
          password:       req.body.password,
          title:          req.body.title,
          name:           req.body.name,
          surname:        req.body.surname,
          email:          req.body.email,
          idcard:         req.body.idcard,
          gender:         req.body.gender,
          birthday:       req.body.birthday,
          houseid:        req.body.houseid,
          moo:            req.body.moo,
          village:        req.body.village,
          road:           req.body.road,
          subdistrict:    req.body.subdistrict,
          district:       req.body.district,
          province:       req.body.province,
          post:           req.body.post,
          phone:          req.body.phone,
          info:           req.body.info,
          family_member:  req.body.family_member,
          education:      req.body.education,
          position:       req.body.position,
          company:        req.body.company,
          star_farmer:    req.body.star_farmer,
          consent:        req.body.consent,
          user_role:      req.body.user_role,
          user_type:      req.body.user_type,
          ip:             req.ip,
          device:         req.get(USER_AGENT_DEVICE)
        }

        const result = await insertOrUpdateUserDetailService(data);
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
export async function insertOrUpdateUserPictureController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "เพิ่ม/แก้ไข รูปภาพ User "
    #swagger.description = "เพิ่ม/แก้ไข รูปภาพ User  <br>
    "
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/FileUpload" } } } }
  */ 
      try {
        const filepath = await handleAttachedFile(req, req.username, 'user')
        const data = {
          username:   req.username,
          filepath:   filepath,
        }
  
        const result = await insertOrUpdateUserPictureService(data);
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
export async function updateStarFarmerController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "แก้ไขสถานะ star_farmer ของ User "
    #swagger.description = "แก้ไขสถานะ star_farmer ของ User  <br><br>

    คนที่เรียกได้ต้องเป็นระดับ ผู้นำ/หัวหน้า ขึ้นไปเปลี่ยนให้ user อื่น <br>
    -ส่ง search_username เพื่อเปลี่ยนสถานะให้คนอื่น  <br>
    -ถ้า ไม่มี search_username จะเปลี่ยนสถานะให้ตัวเองเป็น star  <br>
    star:  เป็น 1 หรือ 0
    "
  */ 
      try {
        
        const data = {
          username:         req.username,
          search_username:  req.query.search_username,
          star:             req.query.star
        }

        const result = await updateStarFarmerService(data);
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
export async function updateUserConsentController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "แก้ไขสถานะ consent ของ User "
    #swagger.description = "แก้ไขสถานะ consent ของ User  <br>
    "
  */ 
      try {
        
        const data = {
          username:     req.username,
          consent:      req.query.consent
        }
  
        const result = await updateUserConsentService(data);
        return next(result);
      } catch (error) {
        console.log(error);
        return next(error);
      }
    }
   
// /**
//  * @param {Request} req HTTP request argument to the middleware function.
//  * @param {Response} res HTTP response argument to the middleware function.
//  * @param {NextFunction} next Callback argument to the middleware function.
//  */
// export async function resetPasswordController(req, res, next) {
//   /*#swagger.tags = ['User'],
//     #swagger.summary = "reset Password"
//     #swagger.description = "reset Password  "
//   */   
//     try {
//       const data ={
//         username:             req.params.username,
//         new_password:         req.body.new_password
//       }
//       const result = await resetPasswordService(data);
//       return next(result);
//     } catch (error) {
//       console.log(error);
//       return next(error);
//     }
//   }


  
/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectUserDetailController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "แสดงข้อมูลของ user"
    #swagger.description = "แสดงข้อมูลของ user  <br><br>
    <br> ถ้า  user_role มีเป็น 3 หรือ 4  ให้เรียกเส้นเพิ่มเพื่อดูว่าเป็นหัวหน้าวิสาหกิจ หรือ ชุมชนใด
    <br> role 3 - หัวหน้าสหกิจชุมชน
    <br> role 4 - ผู้นำชุมชน
    <br> <br> 
    search_username - ส่งมาถ้าต้องการดู detail ของคนอื่น (เช่นหัวหน้า ดูข้อมูลเกษตรกร) <br>
    ถ้าไม่ส่ง search_username มา จะดูข้อมูลของตัวเอง
    "
  */   
    try {
      const data ={
        username:             req.username,
        search_username:      req.query.search_username
      }

      const result = await selectUserDetailService(data);
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
export async function selectHeadCommunityEnterpriseController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "แสดงว่า username นี้เป็นหัวหน้า วิสาหกิจชุมชน ใดบ้าง (CommunityEnterprise)"
    #swagger.description = "แสดงว่า username นี้เป็นหัวหน้า วิสาหกิจชุมชน ใดบ้าง (CommunityEnterprise)  <br><br>
    <br> user_role ต้องมีเป็น 3 ด้วย
    <br> role 3 - หัวหน้าวิสาหกิจชุมชน

    <br>  ถ้าไม่ใส่ search_username มา จะดูว่าตัวเองเป็นหัวหน้า วิสาหกิจชุมชนใด
    <br>  ถ้าใส่ search_username  มา จะดูว่า  search_username นั้นเป็นหัวหน้า วิสาหกิจใด
    "
  */   
    try {
      const data ={
        username:             req.username,
        search_username:      req.query.search_username
      }

      const result = await selectHeadCommunityEnterpriseService(data);
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
export async function selectHeadCommunityController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "แสดงว่า username นี้เป็นหัวหน้า ชุมชน ใดบ้าง (Community)"
    #swagger.description = "แสดงว่า username นี้เป็นหัวหน้า ชุมชน ใดบ้าง (Community)  <br><br>
    <br> user_role ต้องมีเป็น 4 ด้วย
    <br> role 4 - ผู้นำชุมชน<br>
    <br>  ถ้าไม่ใส่ search_username มา จะดูว่าตัวเองเป็นหัวหน้า ชุมชนใด
    <br>  ถ้าใส่ search_username  มา จะดูว่า  search_username นั้นเป็นหัวหน้าชุมชนใด
    "
  */   
    try {
      const data ={
        username:             req.username,
        search_username:      req.query.search_username
      }

      const result = await selectHeadCommunityService(data);
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
export async function selectCommunityEnterpriseController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "แสดงว่า username นี้เป็นสมาชิก CommunityEnterprise ใดบ้าง"
    #swagger.description = "แสดงว่า username นี้เป็นสมาชิก CommunityEnterprise  ใดบ้าง<br><br>
    <br>  ถ้าไม่ใส่ search_username มา จะดูว่าตัวเองเป็นสมาชิก CommunityEnterprise  ใด
    <br>  ถ้าใส่ search_username  มา จะดูว่า  search_username นั้นเป็นสมาชิก CommunityEnterprise  ใด

    "
  */   
    try {
      const data ={
        username:             req.username,
        search_username:      req.query.search_username
      }
      const result = await selectCommunityEnterpriseService(data);
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
  /*#swagger.tags = ['User'],
    #swagger.summary = "แสดงว่า username นี้เป็นสมาชิก Community ใดบ้าง"
    #swagger.description = "แสดงว่า username นี้เป็นสมาชิก Community  ใดบ้าง<br><br>
    <br>
    <br>  ถ้าไม่ใส่ search_username มา จะดูว่าตัวเองเป็นสมาชิก Community ใด
    <br>  ถ้าใส่ search_username  มา จะดูว่า  search_username นั้นเป็นสมาชิก Community ใด

    "
  */   
    try {
      const data ={
        username:             req.username,
        search_username:      req.query.search_username
      }
      const result = await selectCommunityService(data);
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
export async function deleteUserController(req, res, next) {
  /*#swagger.tags = ['User'],
    #swagger.summary = "Delete User  - for dev only"
    #swagger.description = "Delete User ลบ username อื่น เท่านั้น <br>    
    " 
  */   

 try {
   const data = {
     username:          req.username,
     delete_username:   req.query.delete_username
    }

    const result = await deleteUserService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}
