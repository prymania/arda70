import { v } from "../../middlewares/validate.middleware.js";

export const ActivityIdParams = v.object({ activity_id: v.id() });
export const PictureIdParams  = v.object({ picture_id:  v.id() });

const activityFields = {
  type1:            v.text(),
  type2:            v.text(),
  type3:            v.text(),
  pattern:          v.number(),   // 1 พื้นที่, 2 จำนวน, 3 พื้นที่+จำนวน, 4 บ่อ+จำนวนต่อบ่อ
  unit:             v.text(),
  rai:              v.number(),
  ngan:             v.number(),
  wa:               v.number(),
  amount:           v.number(),
  pond:             v.number(),
  amount_per_pond:  v.number(),
  start_date:       v.date(),
  end_date:         v.date(),
  detail:           v.text(),
};

// ต้องระบุ plang_id เสมอ  subplang_id ใส่เมื่อเพิ่มลง subplang
export const ActivityInsertBody = v.object({
  plang_id:    v.required(v.id()),
  subplang_id: v.id().nullish(),
  ...activityFields,
});
export const ActivityUpdateBody = v.object(activityFields);

export const ActivitySearchQuery = v.object({
  search_username:     v.text(),
  search_plang_id:     v.id().optional(),
  search_subplang_id:  v.id().optional(),
  search_activity_id:  v.id().optional(),
});
