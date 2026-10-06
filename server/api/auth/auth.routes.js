import { Router } from "express";
import { changePasswordController, loginController, logoutController, registerController, registerStaffController } from "./auth.controllers.js";
import { authentication} from "../../middlewares/authentication.middleware.js";
const router = Router({ mergeParams: true });


router.post("/register",            registerController)
router.post("/register_staff",      registerStaffController)   // เพื่อไม่ให้กระทบกับเส้นก่อนหน้านี้ เลยแยกเส้น register จนท ให้ใส่ detail ไปด้วยเลย เพื่อรอ admin approve
router.post("/login",               loginController)
router.put("/logout",               authentication,     logoutController)

router.put("/reset_password", authentication, changePasswordController);

export default router;
