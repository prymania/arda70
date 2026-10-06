import { v } from "../../middlewares/validate.middleware.js";

export const AlertIdParams = v.object({ alert_id: v.id() });

// ส่งได้ทั้ง JSON body หรือ multipart/form-data (พร้อมไฟล์ field "file")
const alertFields = {
  alert_type:     v.text(),   // พืช, สัตว์, ภัยพิบัติ, อื่น ๆ
  alert_enddate:  v.date(),   // เฉพาะเกษตรอำเภอ
  detail:         v.text(),
  announcement:   v.flag(),   // 1 = ประกาศถึงเกษตรกรทุกคน
};

export const AlertInsertBody = v.object({
  ...alertFields,
  response_to:    v.any(),    // array ของ alert_id ที่ตอบกลับ เช่น [1,2,6] หรือ "[1,2,6]"
});
export const AlertUpdateBody = v.object(alertFields);
