import { v } from "../../middlewares/validate.middleware.js";

export const SubplangIdParams = v.object({ subplang_id: v.id() });
export const PictureIdParams  = v.object({ picture_id:  v.id() });

const subplangFields = {
  lat_long: v.any(),
  center:   v.any(),
  msquare:  v.number(),
  rai:      v.number(),
  ngan:     v.number(),
  wa:       v.number(),
  detail:   v.text(),
};

// เพิ่ม subplang ต้องบอกว่าอยู่ในแปลงไหน
export const SubplangInsertBody = v.object({ plang_id: v.required(v.id()), ...subplangFields });
export const SubplangUpdateBody = v.object(subplangFields);

export const SubplangSearchQuery = v.object({
  search_username:    v.text(),
  search_plang_id:    v.id().optional(),
  search_subplang_id: v.id().optional(),
});
