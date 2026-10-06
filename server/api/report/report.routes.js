import { Router } from "express";
import { selectAllFarmerInDistrictReportController, selectFarmerInSubdistrictReportController, selectPlangReportController, selectDistrictOverviewController, selectSubdistrictOverviewController } from "./report.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";

const router = Router({ mergeParams: true });


router.get("/1_plang/district_addresscode",                     authentication,      selectPlangReportController)
router.get("/2_all_subdistrict_overview/district_addresscode",  authentication,      selectDistrictOverviewController); 
router.get("/3_farmer/subdistrict_addresscode",                 authentication,      selectFarmerInSubdistrictReportController);
router.get("/4_farmer_all/district_addresscode",                authentication,      selectAllFarmerInDistrictReportController);
router.get("/5_subdistrict_overview/subdistrict_addresscode",   authentication,      selectSubdistrictOverviewController); 



export default router;
