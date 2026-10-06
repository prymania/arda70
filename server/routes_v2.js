import { Router } from "express";
const router = Router({ mergeParams: true });

// /v2 มีเฉพาะ module ที่เปลี่ยน path เป็นแบบ REST  (id อยู่ใน path เช่น /v2/plang/12)
// module อื่น (auth, user, admin, action, forecast, report) ใช้ /v1 ต่อได้ตามเดิม
import plang from "./api_v2/plang/plang.routes.js";
import subplang from "./api_v2/subplang/subplang.routes.js";
import activity from "./api_v2/activity/activity.routes.js";
import disaster from "./api_v2/disaster/disaster.routes.js";
import alert from "./api_v2/alert/alert.routes.js";
import community from "./api_v2/community/community.routes.js";

router.use("/plang", plang);
router.use("/subplang", subplang);
router.use("/activity", activity);
router.use("/disaster", disaster);
router.use("/alert", alert);
router.use("/community", community);

export default router;
