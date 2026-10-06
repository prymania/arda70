import { Router } from "express";
import fileUpload from "express-fileupload";
import * as c from "./subplang.controllers.js";
import * as s from "./subplang.schema.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { body, params } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });

const ownSubplang = requireOwner(["subplang", params("subplang_id")]);
const upload      = fileUpload({ createParentPath: true });

// เส้นที่ path ขึ้นต้นด้วยคำคงที่ ต้องอยู่ก่อน "/:subplang_id"
router.delete("/pictures/:picture_id",          authentication, validate({ params: s.PictureIdParams }), requireOwner(["subplang_picture", params("picture_id")]), c.deleteSubplangPictureController);

router.post("/",                                authentication, validate({ body: s.SubplangInsertBody }), requireOwner(["plang", body("plang_id")]), c.insertSubplangController);
router.get("/",                                 authentication, validate({ query: s.SubplangSearchQuery }), c.selectSubplangController);
router.get("/:subplang_id",                     authentication, validate({ params: s.SubplangIdParams }), c.selectSubplangByIdController);
router.put("/:subplang_id",                     authentication, validate({ params: s.SubplangIdParams, body: s.SubplangUpdateBody }), ownSubplang, c.updateSubplangController);
router.delete("/:subplang_id",                  authentication, validate({ params: s.SubplangIdParams }), ownSubplang, c.deleteSubplangController);
router.get("/:subplang_id/count_activity",      authentication, validate({ params: s.SubplangIdParams }), c.selectSubplangCountActivityController);

router.get("/:subplang_id/pictures",            authentication, validate({ params: s.SubplangIdParams }), c.selectSubplangPictureController);
router.post("/:subplang_id/pictures",           authentication, validate({ params: s.SubplangIdParams }), ownSubplang, upload, c.insertSubplangPictureController);

export default router;
