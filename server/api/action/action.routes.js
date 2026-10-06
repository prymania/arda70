import { Router } from "express";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { requireOwner, requireRole } from "../../middlewares/authorization.middleware.js";
import { ROLE_ADMIN } from "../../constants/table.const.js";
import { body, params } from "../../utils/request.util.js";

import {
  // ACTION (mobile)
  getActionChildrenController,
  getActionDetailController,

  // ACTION MASTER (admin)
  selectAllActionMasterController,
  insertActionMasterController,
  updateActionMasterController,
  deleteActionMasterController,

  // ACTION FLOW (structure)
  insertActionFlowController,
  deleteActionFlowController,
  selectActionChildrenFlowController,

  // ACTION LOG (user history)
  insertActionLogController,
  updateActionLogController,
  deleteActionLogController,
  selectActionLogByActivityController
} from "./action.controllers.js";

const router = Router({ mergeParams: true });

/*  
|--------------------------------------------------------------------------
| ACTION (Mobile) 
|--------------------------------------------------------------------------
*/
router.get("/steps", authentication, getActionChildrenController);

/*  
|--------------------------------------------------------------------------
| ACTION MASTER (Admin)
|--------------------------------------------------------------------------
*/
router.get("/master", authentication, selectAllActionMasterController);
router.post("/master", authentication, requireRole(ROLE_ADMIN), insertActionMasterController);
router.put("/master/:action_id", authentication, requireRole(ROLE_ADMIN), updateActionMasterController);
router.delete("/master/:action_id", authentication, requireRole(ROLE_ADMIN), deleteActionMasterController);

/*  
|--------------------------------------------------------------------------
| ACTION FLOW (Parent → Child Mapping for Step Tree)
|--------------------------------------------------------------------------
*/
router.post("/flow", authentication, requireRole(ROLE_ADMIN), insertActionFlowController);
router.delete("/flow", authentication, requireRole(ROLE_ADMIN), deleteActionFlowController);
router.get("/flow/children/:action_id", authentication, selectActionChildrenFlowController);

/*  
|--------------------------------------------------------------------------
| USER ACTION LOG (History)
|--------------------------------------------------------------------------
*/
router.post("/log", authentication, requireOwner(["activity", body("activity_id")]), insertActionLogController);
router.put("/log/:log_id", authentication, requireOwner(["action_log", params("log_id")]), updateActionLogController);
router.delete("/log/:log_id", authentication, requireOwner(["action_log", params("log_id")]), deleteActionLogController);
router.get("/log/activity/:activity_id", authentication, selectActionLogByActivityController);

/*
| ต้องอยู่ล่างสุด ไม่อย่างนั้น "/:action_id" จะจับ GET /master ไปก่อน (action_id = "master")
*/
router.get("/:action_id", authentication, getActionDetailController);

export default router;
