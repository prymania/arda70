import { Router } from "express";
import  fileUpload from "express-fileupload";
import {
    selectNDVIController,
    selectPlantsController,
    selectSPIController,
    selectSRIController,
    selectSSIController,
    selectSoilLocationController,
    selectStationController,
    selectWDIController, 
 } from "./forecast.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
const router = Router({ mergeParams: true });

router.get("/station",                              selectStationController); //สร้างไว้ทดสอบไม่มีเรียกใช้
router.get("/spi",              authentication,     selectSPIController);   //อุตุนิยมวิทยา ดัชนีปริมาณน้ำฝน
router.get("/sri",              authentication,     selectSRIController);   //อุทกวิทยา ปริมาณน้ำท่า
router.get("/ssi",              authentication,     selectSSIController);   //จากดาวเทียม ความชื้นในดิน-ความแห้งแล้ง
router.get("/ndvi",             authentication,     selectNDVIController);  //จากดาวเทียม ดัชนีความแห้งแล้ง
router.get("/wdi",              authentication,     selectWDIController);   //Water Drough Index ตามลุ่มแม่น้ำ โขง ชี มูล  บอกความแห้งแล้ว
router.get("/plants",           authentication,     selectPlantsController);   //พืชที่เหมาะสมกับการเพาะปลูก ดูจาก SPI index


// หน้าอากาศวันนี้ ไม่ใช่ forcast  แต่รวมเส้นไว้ที่นี่
router.get("/soil/soil_property",  authentication,  selectSoilLocationController);

export default router;
