
import { USER_AGENT_DEVICE } from "../../constants/paramiter.cont.js";
import { setLogger } from "../../utils/logger.util.js";
import { handleAttachedFile } from "../../utils/picture.util.js";
import {
  setResponseError,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { changePasswordService } from "../auth/auth.js";
import { approveUserService, deleteConfigSystemService, deleteUserService, insertConfigSystemService, insertOrUpdateUserDetailService, searchUserDetailService, selectAllRolesService, selectAllUsersService, selectConfigSystemService, updateConfigSystemService, waitForApproveUserDetailService } from "./admin.js";
const logger = setLogger(import.meta.url);




/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function selectAllRolesController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "get all roles name"
    #swagger.description = "get all roles name <br>    
    " 
  */   

 try {
    const result = await selectAllRolesService();
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
export async function selectAllUsersController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "get all USERS detail"
    #swagger.description = "get all USERS detail <br>    
    " 
  */   

 try {
    const result = await selectAllUsersService();
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
export async function searchUserDetailController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "search user by column"
    #swagger.description = "search user by column <br>   
    ค้นหา USERS จากคอลัมน์นี้ โดย serch จากคอลัมน์ใดคอลัมน์หนึ่ง <br>
    priority การ sarch ตามลำดับ<br>
    ถ้าไม่ใส่ serch column มาเลย จะแสดงข้อมูล USERS ทุกคน (เหมือนเส้น admin/users/all)<br><br>
    - username <br> 
    - name <br> 
    - phone <br> 
    - idcard <br> 
    - user_role <br>
    - address_code
    " 
  */   

 try {
  const data = {
    search_username:   req.query.search_username,
    search_name:       req.query.search_name,
    search_phone:      req.query.search_phone,
    search_idcard:     req.query.search_idcard,
    search_user_role:     req.query.search_user_role,
    search_address_code:     req.query.search_address_code,
   }
    const result = await searchUserDetailService(data);
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
export async function waitForApproveUserDetailController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "แสดง user ที่รอ admin approve"
    #swagger.description = "แสดง user ที่รอ admin approve <br>   
    แสดง user ที่รอ admin approve กรณี user ระดับตำบลขึ้นไป <br>
   
    " 
  */   

 try {
  const data = {
   }
    const result = await waitForApproveUserDetailService(data);
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
export async function insertOrUpdateUserDetailController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "update ข้อมูล User  "
    #swagger.description = "update ข้อมูล User คนอื่น ๆ <br>
    - ไม่ใช่เป็นการเพิ่ม user นะ แต่เป็นการ update ข้อมูล User
    - เพิ่ม/แก้ไข ข้อมูล detail ของ user<br>
    - ไม่สามารถเปลี่ยน username <br>
    - ถ้าเปลี่ยน password ให้เรียกเส้น admin/users/reset_password<br>"
  */ 
      try {
        const data = {

          search_username: req.body.search_username,
          address_code:   req.body.address_code,
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
export async function changePasswordController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "Change password"
    #swagger.description = "<b>Change password ให้ user อื่น ๆ </b>"
  
  */  
    try {
      const data = {
        username :              req.body.search_username, // เรียกไปเส้น auth เลยตั้งชื่อ username เลย
        new_password:           req.body.new_password,
      }
      const result = await changePasswordService(data);
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
export async function approveUserController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "approve User ที่เป็นระดับตำบลขึ้นไป"
    #swagger.description = "<b>approve User ที่เป็นระดับตำบลขึ้นไป</b>"
  
  */  
    try {
      const data = {
        username :   req.query.username, 
      }
      const result = await approveUserService(data);
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
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "Delete User "
    #swagger.description = "Delete User ลบ username อื่น เท่านั้น <br>    
    " 
  */   

 try {
   const data = {
     delete_username:   req.query.delete_username
    }

    const result = await deleteUserService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}

/*********************************************** */
/*** CONFIG_SYSTEM ******************************************** */
/*********************************************** */


/**
 * @param {Request} req HTTP request argument to the middleware function.
 * @param {Response} res HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function insertConfigSystemController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "insert CONFIG_SYSTEM"
    #swagger.description = "insert CONFIG_SYSTEM by keyid and value <br>    
    " 
  */   

 try {
   const data = {
     keyid:   req.query.keyid,
     value:   req.query.value
    }

    const result = await insertConfigSystemService(data);
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
export async function updateConfigSystemController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "update CONFIG_SYSTEM"
    #swagger.description = "update value of CONFIG_SYSTEM by keyid <br>    
    " 
  */   

 try {
   const data = {
     keyid:   req.query.keyid,
     value:   req.query.value
    }

    const result = await updateConfigSystemService(data);
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
export async function deleteConfigSystemController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "delete CONFIG_SYSTEM"
    #swagger.description = "delete CONFIG_SYSTEM by keyid <br>    
    " 
  */   

 try {
   const data = {
     keyid:   req.query.keyid
    }

    const result = await deleteConfigSystemService(data);
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
export async function selectConfigSystemController(req, res, next) {
  /*#swagger.tags = ['Admin'],
    #swagger.summary = "search CONFIG_SYSTEM"
    #swagger.description = "ค้นหา CONFIG_SYSTEM ด้วย keyid หรือ value<br>  <br>  
    
    priority การค้นหาคือด้วย keyid , value หรือ ทั้งหมด<br> <br> 
    - ถ้าใส่ keyid จะค้นหาด้วย keyid เสมอ<br> 
    - ถ้าใส่ value จะค้นหาด้วย value<br> 
    - ถ้าไม่ใส่อะไรเลย จะแสดงข้อมูลทั้งหมด<br> 
    " 
  */   

 try {
   const data = {
     keyid:   req.query.keyid,
     value:   req.query.value
  
    }

    const result = await selectConfigSystemService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}
