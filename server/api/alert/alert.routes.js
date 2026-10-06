import { Router } from "express";
import  fileUpload from "express-fileupload";
import {deleteAlertController, insertAlertController,  selectAlertOfficerController,  selectAnnouncementAlertController, selectResponseAlertController, selectAlertController, updateAlertController
} from "./alert.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { body, query } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });

router.post("/",              authentication,     fileUpload({ createParentPath: true}), insertAlertController)

router.put("/alert_id",       authentication,     requireOwner(["alert", query("alert_id")]), fileUpload({ createParentPath: true}), updateAlertController);     
router.delete("/alert_id",    authentication,     requireOwner(["alert", query("alert_id")]), deleteAlertController);

router.get("/",                     authentication,     selectAlertController); //แสดงข้อความของตัวเอง ทั้ง farmer, officer เรียกเส้นนี้
router.get("/announcement",         authentication,     selectAnnouncementAlertController);  //farmer ต้องการแสดง announce จาก officer
router.get("/response/alert_id",    authentication,     selectResponseAlertController); // แสดงคำตอบจากเกษตรอำเภอที่ reply alert_id นั้นๆ
router.get("/officer",              authentication,     selectAlertOfficerController);// officer แสดงข้อความร้องทุกข์จาก farmer


export default router;