// * Import module libraries
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import https from "https";
import http from "http";
// ? if want to use env file. please import(dotenv) every file to be use
import dotenv from "dotenv";
dotenv.config();

import app from "./server/app.js";
import { setLogger } from "./server/utils/logger.util.js";
import { DB_TARGET } from "./server/configs/db.config.js";
import { CAROOT_CERT_PATH, DOMAIN_NAME_PATH, PRIVATE_KEY_PATH } from "./server/constants/ssl.const.js";
import { LOCAL_SWAGGER_DOCS, CLOUD_SWAGGER_DOCS } from "./server/constants/config.const.js";
import { importUserFromFile, importUserPlangFromFile, printUser } from "./server/api/user_name_arda.js";
import { ROLE_FARMER } from "./server/constants/table.const.js";
import { testAPI } from "./server/api/apidata/apidata.js";
import { api_weather } from "./server/api/apidata/api_weather.js";
// import { api_code } from "./server/api/apidata/api_code.js";

//api เก็บค่าข้อมูลจากเสา
import { fetchThingSpeakData, test_weather_api_schedule } from "./server/api/apidata/weather.scheduler.js";


const logger = setLogger(import.meta.url);

// * Set global path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
global.__basedir = __dirname;

// * Set application running port.
const port = process.env.PORT;


// printUser();
// importUserFromFile(`e:/template_user_farmerv2.xlsx`, ROLE_FARMER);
// importUserPlangFromFile(`e:/template_farmer_plang_v3.xlsx`);

// testAPI();
// api_weather();
// api_co();  // ไม่รู้เคยทดสอบอะไร แต่มันคือ  station_code ไปแก้ยังไงถึงเหลือแค่ co เนี่ย งงเบย

//เรียก api เก็บค่าข้อมูลจากเสา
// test_weather_api_schedule();
// fetchThingSpeakData();


// ถ้าเปลี่ยน server ให้แก้ใน .env เท่านั้น (ไม่ต้องแก้โค้ด)
//   local                    : DB_TARGET=local  USE_HTTPS=false
//   cloud (production)       : DB_TARGET=cloud  USE_HTTPS=true
//   local ทดสอบกับ DB cloud   : DB_TARGET=cloud  USE_HTTPS=false
const use_https = process.env.USE_HTTPS === "true";

let server;
if (use_https) {
  // อ่าน cert เฉพาะตอนรัน https  เครื่อง local ไม่ต้องมีไฟล์ cert
  server = https.createServer({
    cert: fs.readFileSync(DOMAIN_NAME_PATH),
    key:  fs.readFileSync(PRIVATE_KEY_PATH),
    ca:   fs.readFileSync(CAROOT_CERT_PATH),
  }, app);
} else {
  server = http.createServer(app);
}

const docs = use_https ? CLOUD_SWAGGER_DOCS : LOCAL_SWAGGER_DOCS;
const project_name = 'ARDA67';

server.listen(port, () => {
  logger.info(`\n================================================================================\n${project_name} is running on port ${port}  (db: ${DB_TARGET}, ${use_https ? "https" : "http"})\nswagger docs: ${docs}:${port}/docs\n================================================================================\n`);
});
