import { Router } from "express";
import  fileUpload from "express-fileupload";
import {deletePlangController, deletePlangPictureController, deleteWaterSourceController, deleteWaterSupplyController, insertPlangController, 
    insertPlangPictureController, insertSoilMeterController, insertWaterSourceController, insertWaterSupplyController, selectPlangController, 
    selectPlangCountDetailController, 
    selectPlangPictureController, 
    selectSoilMeterController, 
    selectWaterSourceController, 
    selectWaterSupplyController, 
    updatePlangController } from "./plang.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { body, query } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });


router.post("/",                            authentication,     insertPlangController)
router.post("/water_supply",                authentication,     requireOwner(["plang", body("plang_id")]), insertWaterSupplyController)
router.post("/water_source",                authentication,     requireOwner(["plang", body("plang_id")]), insertWaterSourceController)
router.post("/picture/plang_id",            authentication,     requireOwner(["plang", query("plang_id")]), fileUpload({ createParentPath: true }), insertPlangPictureController)

router.put("/plang_id",                     authentication,     requireOwner(["plang", body("plang_id")]), updatePlangController)

// // search ทำแค่เส้นเดียว ส่งเป็น query, search by username, plang_id

router.delete("/plang_id",                  authentication,     requireOwner(["plang", query("plang_id")]), deletePlangController)
router.delete("/picture_id",                authentication,     requireOwner(["plang_picture", query("picture_id")]), deletePlangPictureController)

router.get("/",                                 authentication,     selectPlangController)
router.get("/water_supply/plang_id",            authentication,     selectWaterSupplyController)
router.get("/water_source/plang_id",            authentication,     selectWaterSourceController)
router.get("/picture/plang_id",                 authentication,     selectPlangPictureController)

router.delete("/water_source",                  authentication,     requireOwner(["water_source", query("wid")]), deleteWaterSourceController)
router.delete("/water_supply",                  authentication,     requireOwner(["water_supply", query("wid")]), deleteWaterSupplyController)

// ต้องสร้างเส้นที่สรุปจำนวน subplang, activity, diaster ให้เลย เรียกเส้นเดียว เอาไปแสดงบน ui เลย
// router.get("/count_detail/plang_id/:plang_id",selectPlangCountDetailController)

router.post("/soil_meter/plang_id",                authentication,     insertSoilMeterController);
router.get("/soil_meter/plang_id",                authentication,     selectSoilMeterController);
export default router;
