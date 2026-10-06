import { Router } from "express";
import  fileUpload from "express-fileupload";
import { insertCommunityController, selectCommunityController, selectCommunityMemberController } from "./community.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";

const router = Router({ mergeParams: true });

router.post("/",                    authentication,  insertCommunityController)

router.get("/community_id",         authentication,  selectCommunityController)
router.get("/member/community_id",  authentication,  selectCommunityMemberController)


export default router;
