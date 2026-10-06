// v2 : รับ id จาก path แล้วส่งต่อให้ controller/service ของ v1  (logic และ SQL ใช้ชุดเดียวกัน)
import * as v1 from "../../api/plang/plang.controllers.js";


export async function insertPlangController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "เพิ่มแปลงของตัวเอง"
    #swagger.description = "เหมือน POST /v1/plang  ถ้าไม่ส่ง plang_address_code จะใช้ address_code ของเกษตรกร"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PlangInput" } } } }
  */
  return v1.insertPlangController(req, res, next);
}

export async function selectPlangController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "ค้นหาแปลง (ของตัวเอง / search_username / search_plang_id)"
    #swagger.parameters['search_username'] = { in: 'query', type: 'string', description: 'แปลงทั้งหมดของ user นี้' }
    #swagger.parameters['search_plang_id'] = { in: 'query', type: 'integer', description: 'แปลงเดียว' }
  */
  return v1.selectPlangController(req, res, next);
}

export async function selectPlangByIdController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "ข้อมูลแปลงตาม plang_id"
  */
  req.query.search_plang_id = req.params.plang_id;
  return v1.selectPlangController(req, res, next);
}

export async function updatePlangController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "แก้ไขแปลง (เจ้าของ หรือ ผู้นำ/เจ้าหน้าที่)"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/PlangInput" } } } }
  */
  req.body.plang_id = req.params.plang_id;
  return v1.updatePlangController(req, res, next);
}

export async function deletePlangController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "ลบแปลง (เจ้าของ หรือ ผู้นำ/เจ้าหน้าที่)"
  */
  req.query.plang_id = req.params.plang_id;
  return v1.deletePlangController(req, res, next);
}

export async function selectPlangCountDetailController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "นับจำนวน ปลูกพืช / เลี้ยงสัตว์ / subplang / disaster ของแปลง"
  */
  return v1.selectPlangCountDetailController(req, res, next);
}


/* ---------- picture ---------- */

export async function selectPlangPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "รูปภาพของแปลง"
  */
  req.query.plang_id = req.params.plang_id;
  return v1.selectPlangPictureController(req, res, next);
}

export async function insertPlangPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "อัปโหลดรูปภาพแปลง"
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/PictureUpload" } } } }
  */
  req.query.plang_id = req.params.plang_id;
  if (req.query.detail === undefined) req.query.detail = req.body?.detail;
  return v1.insertPlangPictureController(req, res, next);
}

export async function deletePlangPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "ลบรูปภาพแปลง"
  */
  req.query.picture_id = req.params.picture_id;
  return v1.deletePlangPictureController(req, res, next);
}


/* ---------- water supply (แหล่งน้ำของตัวเอง) ---------- */

export async function selectWaterSupplyController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "water supply ของแปลง"
  */
  req.query.plang_id = req.params.plang_id;
  return v1.selectWaterSupplyController(req, res, next);
}

export async function insertWaterSupplyController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "เพิ่ม water supply (บ่อจิ๋ว / น้ำบาดาล)"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WaterSupplyInput" } } } }
  */
  req.body.plang_id = req.params.plang_id;
  return v1.insertWaterSupplyController(req, res, next);
}

export async function deleteWaterSupplyController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "ลบ water supply"
  */
  req.query.wid = req.params.wid;
  return v1.deleteWaterSupplyController(req, res, next);
}


/* ---------- water source (แหล่งน้ำธรรมชาติ) ---------- */

export async function selectWaterSourceController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "water source ของแปลง"
  */
  req.query.plang_id = req.params.plang_id;
  return v1.selectWaterSourceController(req, res, next);
}

export async function insertWaterSourceController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "เพิ่ม water source (ห้วย หนอง คลอง บึง ...)"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WaterSourceInput" } } } }
  */
  req.body.plang_id = req.params.plang_id;
  return v1.insertWaterSourceController(req, res, next);
}

export async function deleteWaterSourceController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "ลบ water source"
  */
  req.query.wid = req.params.wid;
  return v1.deleteWaterSourceController(req, res, next);
}


/* ---------- soil meter ---------- */

export async function selectSoilMeterController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.autoQuery = false
    #swagger.summary = "ข้อมูล soil meter ของแปลง (ใหม่สุดก่อน)"
  */
  req.query.search_plang_id = req.params.plang_id;
  return v1.selectSoilMeterController(req, res, next);
}

export async function insertSoilMeterController(req, res, next) {
  /*#swagger.tags = ['v2 Plang']
    #swagger.summary = "เพิ่มข้อมูล soil meter (soil, t, ph, ec, n, p, k)"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/SoilMeterInput" } } } }
  */
  req.body.plang_id = req.params.plang_id;
  return v1.insertSoilMeterController(req, res, next);
}
