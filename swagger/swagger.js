// สร้าง swagger_output.json จาก comment #swagger ใน controller
//   npm run gendoc        (npm run dev จะเรียกให้อัตโนมัติ)
//
// เพิ่ม API ใหม่:
//   1. เพิ่ม route ใน <module>.routes.js
//   2. ใส่ comment #swagger.tags / summary ใน controller  (ถ้ามี body ใช้ #swagger.requestBody อ้าง $ref)
//   3. ถ้ามี schema ใหม่ เพิ่มใน swagger/schemas/<module>.js  แล้ว import ด้านล่าง
import swaggerAutogen from "swagger-autogen";
import * as common from "./schemas/common.js";
import * as plang from "./schemas/plang.js";
import * as alert from "./schemas/alert.js";

const modules = [common, plang, alert];

const doc = {
  info: {
    version: "2.0.0",
    title: "ARDA67 API",
    description: `
<b>/v1</b> : เส้นเดิมที่ front end ใช้อยู่<br>
<b>/v2</b> : plang, subplang, activity, disaster, alert, community แบบ REST (id อยู่ใน path), ตรวจข้อมูลก่อนเข้า DB, HTTP status ตรงกับ code<br><br>
กดปุ่ม <b>Authorize</b> แล้วใส่ token ที่ได้จาก /v1/auth/login (ช่อง refreshToken) ไม่ต้องพิมพ์คำว่า Bearer`,
  },
  // เลือก server ได้จาก dropdown "Servers" ใน /docs
  // ตัวแรก (/) = server เดียวกับที่เปิด /docs อยู่  ใช้ได้ทั้ง local และ cloud โดยไม่ต้องแก้
  servers: [
    { url: "/",                                 description: "server ที่เปิด /docs อยู่" },
    { url: "http://localhost:9981",             description: "local (http)" },
    { url: "https://www.arda365days.com:9981",  description: "cloud (https)" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas:    Object.assign({}, ...modules.map((m) => m.examples)),
    "@schemas": Object.assign({}, ...modules.map((m) => m.schemas)),
  },
  // ทุกเส้นต้องใช้ token  เส้นที่ไม่ต้องใช้ให้ใส่ #swagger.security = [] ใน controller
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server/app.js"];

// autoHeaders: false  ไม่ต้องสร้างช่อง header authorization ทุกเส้น (ใช้ปุ่ม Authorize แทน)
await swaggerAutogen({ openapi: "3.0.0", autoHeaders: false })(outputFile, endpointsFiles, doc);
