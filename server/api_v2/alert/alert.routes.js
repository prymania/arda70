import { Router } from "express";
import fileUpload from "express-fileupload";
import * as c from "./alert.controllers.js";
import * as s from "./alert.schema.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { params } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });

const ownAlert = requireOwner(["alert", params("alert_id")]);
const upload   = fileUpload({ createParentPath: true });

// เส้นที่ path ขึ้นต้นด้วยคำคงที่ ต้องอยู่ก่อน "/:alert_id"
router.get("/announcement",         authentication, c.selectAnnouncementAlertController);
router.get("/officer",              authentication, c.selectAlertOfficerController);

router.post("/",                    authentication, upload, validate({ body: s.AlertInsertBody }), c.insertAlertController);
router.get("/",                     authentication, c.selectAlertController);
router.get("/:alert_id/responses",  authentication, validate({ params: s.AlertIdParams }), c.selectResponseAlertController);
router.put("/:alert_id",            authentication, validate({ params: s.AlertIdParams }), ownAlert, upload, validate({ body: s.AlertUpdateBody }), c.updateAlertController);
router.delete("/:alert_id",         authentication, validate({ params: s.AlertIdParams }), ownAlert, c.deleteAlertController);

export default router;
