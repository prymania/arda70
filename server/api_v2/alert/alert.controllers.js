// v2 : รับ id จาก path แล้วส่งต่อให้ controller/service ของ v1  (logic และ SQL ใช้ชุดเดียวกัน)
import * as v1 from "../../api/alert/alert.controllers.js";

// v1 รับค่า alert ทาง query string (เพราะ upload ไฟล์)  v2 รับใน body ได้ แล้วย้ายไป query ให้ v1
const ALERT_FIELDS = ["alert_type", "alert_enddate", "detail", "announcement", "response_to"];
function moveBodyToQuery(req) {
  for (const field of ALERT_FIELDS) {
    if (req.query[field] !== undefined || req.body?.[field] === undefined) continue;
    const value = req.body[field];
    // service เดิมรับ response_to เป็น string เช่น "[1,2,6]"
    req.query[field] = (field === "response_to" && Array.isArray(value)) ? JSON.stringify(value) : value;
  }
}


export async function insertAlertController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.autoQuery = false
    #swagger.summary = "เพิ่ม alert (เกษตรกรร้องเรียน / เกษตรอำเภอตอบกลับหรือประกาศ)"
    #swagger.description = "ส่งเป็น multipart/form-data (มีรูป field file) หรือ JSON ก็ได้<br>
    - เกษตรกร: ไม่ต้องส่ง alert_enddate, response_to<br>
    - เกษตรอำเภอตอบกลับ: ส่ง response_to เป็น array ของ alert_id<br>
    - เกษตรอำเภอประกาศ: ส่ง announcement = 1"
    #swagger.requestBody = { required: true, content: {
      "multipart/form-data": { schema: { $ref: "#/components/schemas/AlertInputForm" } },
      "application/json":    { schema: { $ref: "#/components/schemas/AlertInput" } } } }
  */
  moveBodyToQuery(req);
  return v1.insertAlertController(req, res, next);
}

export async function selectAlertController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.summary = "alert ของตัวเอง (ทั้ง farmer และ officer)"
  */
  return v1.selectAlertController(req, res, next);
}

export async function selectAnnouncementAlertController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.summary = "ประกาศจากเจ้าหน้าที่ (สำหรับเกษตรกร)"
  */
  return v1.selectAnnouncementAlertController(req, res, next);
}

export async function selectAlertOfficerController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.summary = "ข้อความร้องเรียนจากเกษตรกร (สำหรับเจ้าหน้าที่)"
  */
  return v1.selectAlertOfficerController(req, res, next);
}

export async function selectResponseAlertController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.autoQuery = false
    #swagger.summary = "คำตอบจากเกษตรอำเภอของ alert นี้"
  */
  req.query.alert_id = req.params.alert_id;
  return v1.selectResponseAlertController(req, res, next);
}

export async function updateAlertController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.autoQuery = false
    #swagger.summary = "แก้ไข alert (เจ้าของ หรือ ผู้นำ/เจ้าหน้าที่)"
    #swagger.requestBody = { required: true, content: {
      "multipart/form-data": { schema: { $ref: "#/components/schemas/AlertInputForm" } },
      "application/json":    { schema: { $ref: "#/components/schemas/AlertInput" } } } }
  */
  moveBodyToQuery(req);
  req.query.alert_id = req.params.alert_id;
  return v1.updateAlertController(req, res, next);
}

export async function deleteAlertController(req, res, next) {
  /*#swagger.tags = ['v2 Alert']
    #swagger.autoQuery = false
    #swagger.summary = "ลบ alert (เจ้าของ หรือ ผู้นำ/เจ้าหน้าที่)"
  */
  req.query.alert_id = req.params.alert_id;
  return v1.deleteAlertController(req, res, next);
}
