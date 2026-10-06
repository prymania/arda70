import { Router } from "express";
const router = Router({ mergeParams: true });

import user from "./api/user/user.routes.js";
import community from "./api/community/community.routes.js";
import plang from "./api/plang/plang.routes.js";
import subplang from "./api/subplang/subplang.routes.js";
import activity from "./api/activity/activity.routes.js";
import action from "./api/action/action.routes.js";
import disaster from "./api/disaster/disaster.routes.js";
import forecast from "./api/forecast/forecast.routes.js";
import alert from "./api/alert/alert.routes.js";
import report from "./api/report/report.routes.js";
import auth from "./api/auth/auth.routes.js";
import admin from "./api/admin/admin.routes.js";

// router.use("", add);
router.use("/admin", admin);
router.use("/auth", auth);
router.use("/user", user)
router.use("/community", community)
router.use("/plang", plang)
router.use("/subplang", subplang)
router.use("/activity", activity)
router.use("/action", action)
router.use("/disaster", disaster)
router.use("/alert", alert);
router.use("/forecast", forecast)
router.use("/report", report);

export default router;
