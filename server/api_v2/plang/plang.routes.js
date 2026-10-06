import { Router } from "express";
import fileUpload from "express-fileupload";
import * as c from "./plang.controllers.js";
import * as s from "./plang.schema.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { params } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });

const ownPlang = requireOwner(["plang", params("plang_id")]);
const upload   = fileUpload({ createParentPath: true });

// เส้นที่ path ขึ้นต้นด้วยคำคงที่ ต้องอยู่ก่อน "/:plang_id"
router.delete("/pictures/:picture_id",      authentication, validate({ params: s.PictureIdParams }), requireOwner(["plang_picture", params("picture_id")]), c.deletePlangPictureController);
router.delete("/water_supply/:wid",         authentication, validate({ params: s.WidParams }),       requireOwner(["water_supply",  params("wid")]),        c.deleteWaterSupplyController);
router.delete("/water_source/:wid",         authentication, validate({ params: s.WidParams }),       requireOwner(["water_source",  params("wid")]),        c.deleteWaterSourceController);

router.post("/",                            authentication, validate({ body: s.PlangBody }),                         c.insertPlangController);
router.get("/",                             authentication, validate({ query: s.PlangSearchQuery }),                 c.selectPlangController);
router.get("/:plang_id",                    authentication, validate({ params: s.PlangIdParams }),                   c.selectPlangByIdController);
router.put("/:plang_id",                    authentication, validate({ params: s.PlangIdParams, body: s.PlangBody }), ownPlang, c.updatePlangController);
router.delete("/:plang_id",                 authentication, validate({ params: s.PlangIdParams }),                   ownPlang, c.deletePlangController);
router.get("/:plang_id/count_detail",       authentication, validate({ params: s.PlangIdParams }),                   c.selectPlangCountDetailController);

router.get("/:plang_id/pictures",           authentication, validate({ params: s.PlangIdParams }),                   c.selectPlangPictureController);
router.post("/:plang_id/pictures",          authentication, validate({ params: s.PlangIdParams }),                   ownPlang, upload, c.insertPlangPictureController);

router.get("/:plang_id/water_supply",       authentication, validate({ params: s.PlangIdParams }),                   c.selectWaterSupplyController);
router.post("/:plang_id/water_supply",      authentication, validate({ params: s.PlangIdParams, body: s.WaterSupplyBody }), ownPlang, c.insertWaterSupplyController);

router.get("/:plang_id/water_source",       authentication, validate({ params: s.PlangIdParams }),                   c.selectWaterSourceController);
router.post("/:plang_id/water_source",      authentication, validate({ params: s.PlangIdParams, body: s.WaterSourceBody }), ownPlang, c.insertWaterSourceController);

router.get("/:plang_id/soil_meter",         authentication, validate({ params: s.PlangIdParams }),                   c.selectSoilMeterController);
router.post("/:plang_id/soil_meter",        authentication, validate({ params: s.PlangIdParams, body: s.SoilMeterBody }), c.insertSoilMeterController);

export default router;
