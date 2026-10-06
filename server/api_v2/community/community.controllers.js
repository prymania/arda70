// v2 : รับ id จาก path แล้วส่งต่อให้ controller/service ของ v1  (logic และ SQL ใช้ชุดเดียวกัน)
import * as v1 from "../../api/community/community.controllers.js";


export async function insertCommunityController(req, res, next) {
  /*#swagger.tags = ['v2 Community']
    #swagger.autoQuery = false
    #swagger.summary = "เพิ่มชุมชน"
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CommunityInput" } } } }
  */
  // v1 รับทาง query string  v2 รับใน JSON body
  req.query.community_name = req.body.community_name;
  req.query.head_user      = req.body.head_user;
  return v1.insertCommunityController(req, res, next);
}

export async function selectCommunityController(req, res, next) {
  /*#swagger.tags = ['v2 Community']
    #swagger.autoQuery = false
    #swagger.summary = "ข้อมูลชุมชน"
  */
  req.query.community_id = req.params.community_id;
  return v1.selectCommunityController(req, res, next);
}

export async function selectCommunityMemberController(req, res, next) {
  /*#swagger.tags = ['v2 Community']
    #swagger.autoQuery = false
    #swagger.summary = "สมาชิกในชุมชน"
  */
  req.query.community_id = req.params.community_id;
  return v1.selectCommunityMemberController(req, res, next);
}
