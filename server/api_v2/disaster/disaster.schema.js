import { v } from "../../middlewares/validate.middleware.js";

export const DisasterIdParams = v.object({ disaster_id: v.id() });
export const PictureIdParams  = v.object({ picture_id:  v.id() });

const disasterFields = {
  category:   v.text(),     // ภัยแล้ง, น้ำท่วม, โรคพืช, อื่น ๆ
  type:       v.text(),
  affect:     v.text(),
  start_date: v.date(),
  end_date:   v.date(),
  size:       v.number(),
  unit:       v.text(),
  detail:     v.text(),
};

export const DisasterInsertBody = v.object({ plang_id: v.required(v.id()), ...disasterFields });
export const DisasterUpdateBody = v.object(disasterFields);

export const DisasterSearchQuery = v.object({
  search_username:     v.text(),
  search_plang_id:     v.id().optional(),
  search_disaster_id:  v.id().optional(),
});
