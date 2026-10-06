import { Router } from "express";
import fileUpload from "express-fileupload";
import * as c from "./activity.controllers.js";
import * as s from "./activity.schema.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { body, params } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });

const ownActivity = requireOwner(["activity", params("activity_id")]);
const upload      = fileUpload({ createParentPath: true });

// เส้นที่ path ขึ้นต้นด้วยคำคงที่ ต้องอยู่ก่อน "/:activity_id"
router.get("/master/type1",                     authentication, c.selectActivityMasterType1Controller);
router.get("/master/type2",                     authentication, c.selectActivityMasterType2Controller);
router.get("/master/type3",                     authentication, c.selectActivityMasterType3Controller);
router.delete("/pictures/:picture_id",          authentication, validate({ params: s.PictureIdParams }), requireOwner(["activity_picture", params("picture_id")]), c.deleteActivityPictureController);

router.post("/",                                authentication, validate({ body: s.ActivityInsertBody }), requireOwner(["plang", body("plang_id")], ["subplang", body("subplang_id")]), c.insertActivityController);
router.get("/",                                 authentication, validate({ query: s.ActivitySearchQuery }), c.selectActivityController);
router.get("/:activity_id",                     authentication, validate({ params: s.ActivityIdParams }), c.selectActivityByIdController);
router.put("/:activity_id",                     authentication, validate({ params: s.ActivityIdParams, body: s.ActivityUpdateBody }), ownActivity, c.updateActivityController);
router.delete("/:activity_id",                  authentication, validate({ params: s.ActivityIdParams }), ownActivity, c.deleteActivityController);

router.get("/:activity_id/pictures",            authentication, validate({ params: s.ActivityIdParams }), c.selectActivityPictureController);
router.post("/:activity_id/pictures",           authentication, validate({ params: s.ActivityIdParams }), ownActivity, upload, c.insertActivityPictureController);

export default router;
