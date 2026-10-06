// v2 : รับ id จาก path แล้วส่งต่อให้ controller/service ของ v1  (logic และ SQL ใช้ชุดเดียวกัน)
import * as v1 from "../../api/activity/activity.controllers.js";


export async function insertActivityController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.summary = "เพิ่ม activity (การเพาะปลูก/เลี้ยงสัตว์)"
    #swagger.description = "เหมือน POST /v1/activity/plang_id  ต้องส่ง plang_id เสมอ, subplang_id ใส่เมื่อเพิ่มลง subplang"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ActivityInsertInput" } } } }
  */
  return v1.insertActivityController(req, res, next);
}

export async function selectActivityController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.summary = "ค้นหา activity (ของตัวเอง / search_username / search_plang_id / search_subplang_id / search_activity_id)"
    #swagger.parameters['search_username']     = { in: 'query', type: 'string' }
    #swagger.parameters['search_plang_id']      = { in: 'query', type: 'integer' }
    #swagger.parameters['search_subplang_id']   = { in: 'query', type: 'integer' }
    #swagger.parameters['search_activity_id']   = { in: 'query', type: 'integer' }
  */
  return v1.selectActivityController(req, res, next);
}

export async function selectActivityByIdController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.autoQuery = false
    #swagger.summary = "ข้อมูล activity ตาม activity_id"
  */
  req.query.search_activity_id = req.params.activity_id;
  return v1.selectActivityController(req, res, next);
}

export async function updateActivityController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.summary = "แก้ไข activity"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ActivityUpdateInput" } } } }
  */
  req.body.activity_id = req.params.activity_id;
  return v1.updateActivityController(req, res, next);
}

export async function deleteActivityController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.autoQuery = false
    #swagger.summary = "ลบ activity"
  */
  req.query.activity_id = req.params.activity_id;
  return v1.deleteActivityController(req, res, next);
}

export async function selectActivityPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.autoQuery = false
    #swagger.summary = "รูปภาพของ activity"
  */
  req.query.activity_id = req.params.activity_id;
  return v1.selectActivityPictureController(req, res, next);
}

export async function insertActivityPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.autoQuery = false
    #swagger.summary = "อัปโหลดรูปภาพ activity"
    #swagger.requestBody = { required: true, content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/PictureUpload" } } } }
  */
  req.query.activity_id = req.params.activity_id;
  if (req.query.detail === undefined) req.query.detail = req.body?.detail;
  return v1.insertActivityPictureController(req, res, next);
}

export async function deleteActivityPictureController(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.autoQuery = false
    #swagger.summary = "ลบรูปภาพ activity"
  */
  req.query.picture_id = req.params.picture_id;
  return v1.deleteActivityPictureController(req, res, next);
}

export async function selectActivityMasterType1Controller(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.summary = "master กิจกรรมระดับ 1 (เช่น ประมงน้ำจืด)"
  */
  return v1.selectActivityMasterType1Controller(req, res, next);
}

export async function selectActivityMasterType2Controller(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.summary = "master กิจกรรมระดับ 2 ตาม type1"
    #swagger.parameters['type1'] = { in: 'query', type: 'string', required: true }
  */
  return v1.selectActivityMasterType2Controller(req, res, next);
}

export async function selectActivityMasterType3Controller(req, res, next) {
  /*#swagger.tags = ['v2 Activity']
    #swagger.summary = "master กิจกรรมระดับ 3 ตาม type2 (มี pattern, unit)"
    #swagger.parameters['type2'] = { in: 'query', type: 'string', required: true }
  */
  return v1.selectActivityMasterType3Controller(req, res, next);
}
