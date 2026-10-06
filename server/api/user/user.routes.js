import { Router } from "express";
import  fileUpload from "express-fileupload";

import { deleteUserController, insertOrUpdateUserDetailController, insertOrUpdateUserPictureController, 
    selectCommunityController, 
    selectCommunityEnterpriseController, selectHeadCommunityController, selectHeadCommunityEnterpriseController, 
    selectUserDetailController, updateStarFarmerController, updateUserConsentController} from "./user.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireRole, requireStaff } from "../../middlewares/authorization.middleware.js";
import { ROLE_ADMIN } from "../../constants/table.const.js";
const router = Router({ mergeParams: true });

// router.post("/register", registerController)  // ย้ายไป auth
// router.post("/login", loginController)
// router.put("/reset_password/:username", resetPasswordController)

router.post("/user_detail",             authentication,     insertOrUpdateUserDetailController)

router.post("/star_farmer",             authentication,     requireStaff(), updateStarFarmerController); //ต้องเป็นผู้นำเปลี่ยนให้เท่านั้น
router.post("/user_consent",            authentication,     updateUserConsentController);
router.post("/user_picture",            authentication,     fileUpload({ createParentPath: true }), insertOrUpdateUserPictureController)

router.get("/",                         authentication,     selectUserDetailController) //user ดูdetail ของตัวเองและคนอื่น

router.get("/head_ce",                  authentication,     selectHeadCommunityEnterpriseController);  //username คนนี้เป็นหัวหน้า  cm ใดบ้าง
router.get("/head_community",           authentication,     selectHeadCommunityController);  //  username คนนี้เป็นหัวหน้า  ชุมชน ใดบ้าง

router.get("/ce",                       authentication,     selectCommunityEnterpriseController);  //  username คนนี้เป็นmember  cm ใดบ้าง
router.get("/community",                authentication,     selectCommunityController);  //  username คนนี้เป็นmember  ชุมชน ใดบ้าง

router.delete("/username",              authentication,     requireRole(ROLE_ADMIN), deleteUserController) //admin delete user อื่น

export default router;
