import { Router } from "express";
import fileUpload from "express-fileupload";
import * as c from "./disaster.controllers.js";
import * as s from "./disaster.schema.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { body, params } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });

const ownDisaster = requireOwner(["disaster", params("disaster_id")]);
const upload      = fileUpload({ createParentPath: true });

// เส้นที่ path ขึ้นต้นด้วยคำคงที่ ต้องอยู่ก่อน "/:disaster_id"
router.delete("/pictures/:picture_id",          authentication, validate({ params: s.PictureIdParams }), requireOwner(["disaster_picture", params("picture_id")]), c.deleteDisasterPictureController);

router.post("/",                                authentication, validate({ body: s.DisasterInsertBody }), requireOwner(["plang", body("plang_id")]), c.insertDisasterController);
router.get("/",                                 authentication, validate({ query: s.DisasterSearchQuery }), c.selectDisasterController);
router.get("/:disaster_id",                     authentication, validate({ params: s.DisasterIdParams }), c.selectDisasterByIdController);
router.put("/:disaster_id",                     authentication, validate({ params: s.DisasterIdParams, body: s.DisasterUpdateBody }), ownDisaster, c.updateDisasterController);
router.delete("/:disaster_id",                  authentication, validate({ params: s.DisasterIdParams }), ownDisaster, c.deleteDisasterController);

router.get("/:disaster_id/pictures",            authentication, validate({ params: s.DisasterIdParams }), c.selectDisasterPictureController);
router.post("/:disaster_id/pictures",           authentication, validate({ params: s.DisasterIdParams }), ownDisaster, upload, c.insertDisasterPictureController);

export default router;
