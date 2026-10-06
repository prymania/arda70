import { Router } from "express";
import  fileUpload from "express-fileupload";
import {deleteSubplangController, deleteSubplangPictureController, insertSubplangController, 
    insertSubplangPictureController,  selectSubplangController, 
    selectSubplangCountActivityController, 
    selectSubplangPictureController, 
    updateSubplangController } from "./subplang.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { body, query } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });


router.post("/plang_id",                                authentication,     requireOwner(["plang", body("plang_id")]), insertSubplangController)
router.post("/picture/subplang_id",                     authentication,     requireOwner(["subplang", query("subplang_id")]), fileUpload({ createParentPath: true }), insertSubplangPictureController)
router.put("/subplang_id",                              authentication,     requireOwner(["subplang", body("subplang_id")]), updateSubplangController)
router.delete("/subplang_id",                           authentication,     requireOwner(["subplang", query("subplang_id")]), deleteSubplangController)
router.delete("/picture_id",                            authentication,     requireOwner(["subplang_picture", query("picture_id")]), deleteSubplangPictureController)

router.get("/",                                         authentication,     selectSubplangController)  // search by username, plang_id, subplang_id
router.get("/picture/subplang_id",                      authentication,     selectSubplangPictureController)


// ต้องสร้างเส้นที่สรุปจำนวน subSubplang, activity, diaster ให้เลย เรียกเส้นเดียว เอาไปแสดงบน ui เลย
router.get("/count_activity/subplang_id/:subplang_id",  authentication,     selectSubplangCountActivityController)



export default router;
