import { Router } from "express";
import  fileUpload from "express-fileupload";
import {deleteActivityController, deleteActivityPictureController, insertActivityController, insertActivityPictureController, selectActivityController, selectActivityMasterType1Controller, selectActivityMasterType2Controller, selectActivityMasterType3Controller, selectActivityPictureController, updateActivityController, 
     } from "./activity.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner } from "../../middlewares/authorization.middleware.js";
import { body, query } from "../../utils/request.util.js";
const router = Router({ mergeParams: true });


router.post("/plang_id",                               authentication,     requireOwner(["plang", body("plang_id")], ["subplang", body("subplang_id")]), insertActivityController)
router.post("/picture/activity_id",                    authentication,     requireOwner(["activity", query("activity_id")]), fileUpload({ createParentPath: true }), insertActivityPictureController)
router.put("/activity_id",                             authentication,     requireOwner(["activity", body("activity_id")]), updateActivityController)
router.delete("/activity_id",                          authentication,     requireOwner(["activity", query("activity_id")]), deleteActivityController)
router.delete("/picture_id",                           authentication,     requireOwner(["activity_picture", query("picture_id")]), deleteActivityPictureController)

//search_by username, plang_id, subplang_id, activity_id, username 
router.get("/",                                        authentication,     selectActivityController)
router.get("/picture/activity_id",                     authentication,     selectActivityPictureController)

// ACTIVITY_MASTER
router.get("/master/type1",                            authentication,     selectActivityMasterType1Controller)
router.get("/master/type2",                            authentication,     selectActivityMasterType2Controller)
router.get("/master/type3",                            authentication,     selectActivityMasterType3Controller)


export default router;
