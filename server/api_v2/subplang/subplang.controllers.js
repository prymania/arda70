// v2 : รับ id จาก path แล้วส่งต่อให้ controller/service ของ v1  (logic และ SQL ใช้ชุดเดียวกัน)
import * as v1 from "../../api/subplang/subplang.controllers.js";


export async function insertSubplangController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.summary = "เพิ่ม subplang ลงในแปลง (ส่ง plang_id ใน body)"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/SubplangInsertInput" } } } }
  */
  return v1.insertSubplangController(req, res, next);
}

export async function selectSubplangController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.summary = "ค้นหา subplang (ของตัวเอง / search_username / search_plang_id / search_subplang_id)"
    #swagger.parameters['search_username']    = { in: 'query', type: 'string' }
    #swagger.parameters['search_plang_id']     = { in: 'query', type: 'integer' }
    #swagger.parameters['search_subplang_id']  = { in: 'query', type: 'integer' }
  */
  return v1.selectSubplangController(req, res, next);
}

export async function selectSubplangByIdController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.autoQuery = false
    #swagger.summary = "ข้อมูล subplang ตาม subplang_id"
  */
  req.query.search_subplang_id = req.params.subplang_id;
  return v1.selectSubplangController(req, res, next);
}

export async function updateSubplangController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.summary = "แก้ไข subplang"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/SubplangUpdateInput" } } } }
  */
  req.body.subplang_id = req.params.subplang_id;
  return v1.updateSubplangController(req, res, next);
}

export async function deleteSubplangController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.autoQuery = false
    #swagger.summary = "ลบ subplang"
  */
  req.query.subplang_id = req.params.subplang_id;
  return v1.deleteSubplangController(req, res, next);
}

export async function selectSubplangCountActivityController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.summary = "นับจำนวน activity ของ subplang"
  */
  return v1.selectSubplangCountActivityController(req, res, next);
}

export async function selectSubplangPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.autoQuery = false
    #swagger.summary = "รูปภาพของ subplang"
  */
  req.query.subplang_id = req.params.subplang_id;
  return v1.selectSubplangPictureController(req, res, next);
}

export async function insertSubplangPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.autoQuery = false
    #swagger.summary = "อัปโหลดรูปภาพ subplang"
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/PictureUpload" } } } }
  */
  req.query.subplang_id = req.params.subplang_id;
  if (req.query.detail === undefined) req.query.detail = req.body?.detail;
  return v1.insertSubplangPictureController(req, res, next);
}

export async function deleteSubplangPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Subplang']
    #swagger.autoQuery = false
    #swagger.summary = "ลบรูปภาพ subplang"
  */
  req.query.picture_id = req.params.picture_id;
  return v1.deleteSubplangPictureController(req, res, next);
}
