import { Router } from "express";

import { approveUserController, changePasswordController, deleteConfigSystemController, deleteUserController, insertConfigSystemController, insertOrUpdateUserDetailController, searchUserDetailController, selectAllRolesController, selectAllUsersController, selectConfigSystemController, updateConfigSystemController, waitForApproveUserDetailController} from "./admin.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireRole } from "../../middlewares/authorization.middleware.js";
import { ROLE_ADMIN } from "../../constants/table.const.js";

const router = Router({ mergeParams: true });


router.get("/roles",                    authentication,         selectAllRolesController)

router.get("/users/all",                authentication, requireRole(ROLE_ADMIN),         selectAllUsersController)
router.get("/users/search",             authentication, requireRole(ROLE_ADMIN),         searchUserDetailController)
router.get("/users/wait_for_approve",   authentication, requireRole(ROLE_ADMIN),   waitForApproveUserDetailController)

router.put("/users/user_detail",        authentication, requireRole(ROLE_ADMIN),   insertOrUpdateUserDetailController)
router.put("/users/reset_password",     authentication, requireRole(ROLE_ADMIN),   changePasswordController);
router.put("/users/approve_user",       authentication, requireRole(ROLE_ADMIN),   approveUserController);


router.delete("/users",      authentication, requireRole(ROLE_ADMIN),     deleteUserController) //admin delete user อื่น


/** CONFIG_SYSTEM**************************** */
router.post("/config",      authentication, requireRole(ROLE_ADMIN),   insertConfigSystemController);
router.put("/config",       authentication, requireRole(ROLE_ADMIN),   updateConfigSystemController);
router.delete("/config",    authentication, requireRole(ROLE_ADMIN),   deleteConfigSystemController);
router.get("/config",       authentication, requireRole(ROLE_ADMIN),   selectConfigSystemController);


export default router;
