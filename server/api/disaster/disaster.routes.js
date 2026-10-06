import { Router } from "express";
import  fileUpload from "express-fileupload";
import {deleteDisasterController, deleteDisasterPictureController, insertDisasterController,  insertDisasterPictureController,  selectDisasterController, selectDisasterPictureController, updateDisasterController } from "./disaster.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { body, query } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });


router.post("/plang_id",                        authentication,     requireOwner(["plang", body("plang_id")]), insertDisasterController)
router.post("/picture/disaster_id",             authentication,     requireOwner(["disaster", query("disaster_id")]), fileUpload({ createParentPath: true }), insertDisasterPictureController)
router.put("/disaster_id",                      authentication,     requireOwner(["disaster", body("disaster_id")]), updateDisasterController)
router.delete("/disaster_id",                   authentication,     requireOwner(["disaster", query("disaster_id")]), deleteDisasterController)
router.delete("/picture_id",                    authentication,     requireOwner(["disaster_picture", query("picture_id")]), deleteDisasterPictureController)

//search disaster by username, plang_id , disaster_id ได้แค่ 3 คอลัมน์เท่านั้น
router.get("/",                                 authentication,     selectDisasterController)
router.get("/picture/disaster_id",              authentication,     selectDisasterPictureController)
export default router;
