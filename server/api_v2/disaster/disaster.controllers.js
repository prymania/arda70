// v2 : รับ id จาก path แล้วส่งต่อให้ controller/service ของ v1  (logic และ SQL ใช้ชุดเดียวกัน)
import * as v1 from "../../api/disaster/disaster.controllers.js";


export async function insertDisasterController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.summary = "เพิ่ม disaster (ภัยแล้ง, น้ำท่วม, โรคพืช, อื่น ๆ) ลงแปลง (ส่ง plang_id ใน body)"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/DisasterInsertInput" } } } }
  */
  return v1.insertDisasterController(req, res, next);
}

export async function selectDisasterController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.summary = "ค้นหา disaster (ของตัวเอง / search_username / search_plang_id / search_disaster_id)"
    #swagger.parameters['search_username']     = { in: 'query', type: 'string' }
    #swagger.parameters['search_plang_id']      = { in: 'query', type: 'integer' }
    #swagger.parameters['search_disaster_id']   = { in: 'query', type: 'integer' }
  */
  return v1.selectDisasterController(req, res, next);
}

export async function selectDisasterByIdController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.autoQuery = false
    #swagger.summary = "ข้อมูล disaster ตาม disaster_id"
  */
  req.query.search_disaster_id = req.params.disaster_id;
  return v1.selectDisasterController(req, res, next);
}

export async function updateDisasterController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.summary = "แก้ไข disaster"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/DisasterUpdateInput" } } } }
  */
  req.body.disaster_id = req.params.disaster_id;
  return v1.updateDisasterController(req, res, next);
}

export async function deleteDisasterController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.autoQuery = false
    #swagger.summary = "ลบ disaster"
  */
  req.query.disaster_id = req.params.disaster_id;
  return v1.deleteDisasterController(req, res, next);
}

export async function selectDisasterPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.autoQuery = false
    #swagger.summary = "รูปภาพของ disaster"
  */
  req.query.disaster_id = req.params.disaster_id;
  return v1.selectDisasterPictureController(req, res, next);
}

export async function insertDisasterPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.autoQuery = false
    #swagger.summary = "อัปโหลดรูปภาพ disaster"
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/PictureUpload" } } } }
  */
  req.query.disaster_id = req.params.disaster_id;
  if (req.query.detail === undefined) req.query.detail = req.body?.detail;
  return v1.insertDisasterPictureController(req, res, next);
}

export async function deleteDisasterPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Disaster']
    #swagger.autoQuery = false
    #swagger.summary = "ลบรูปภาพ disaster"
  */
  req.query.picture_id = req.params.picture_id;
  return v1.deleteDisasterPictureController(req, res, next);
}
