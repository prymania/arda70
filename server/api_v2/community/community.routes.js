import { Router } from "express";
import * as c from "./community.controllers.js";
import * as s from "./community.schema.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
const router = Router({ mergeParams: true });

router.post("/",                        authentication, validate({ body: s.CommunityInsertBody }), c.insertCommunityController);
router.get("/:community_id",            authentication, validate({ params: s.CommunityIdParams }), c.selectCommunityController);
router.get("/:community_id/members",    authentication, validate({ params: s.CommunityIdParams }), c.selectCommunityMemberController);

export default router;
