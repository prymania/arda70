import { z } from "zod";
import { setResponseError } from "../utils/response.util.js";

// ตัวช่วยสร้าง schema  ใช้ใน api_v2/<module>/<module>.schema.js
// ตั้งใจให้ "ตรวจอย่างเดียว" ไม่แปลงค่า  ค่าใน req ที่ส่งต่อให้ service จึงเหมือน v1 ทุกอย่าง
export const v = {
  id:       ()  => z.union([z.number().int().positive(), z.string().regex(/^\d+$/, "ต้องเป็นเลขจำนวนเต็มบวก")]),
  number:   ()  => z.union([z.number(), z.string().regex(/^-?\d+(\.\d+)?$/, "ต้องเป็นตัวเลข"), z.null(), z.literal("")]).optional(),
  text:     ()  => z.union([z.string(), z.number(), z.null()]).optional(),
  date:     ()  => z.union([z.string().refine((s) => s === "" || !isNaN(Date.parse(s)), "รูปแบบวันที่ไม่ถูกต้อง"), z.null()]).optional(),
  flag:     ()  => z.union([z.literal(0), z.literal(1), z.literal("0"), z.literal("1"), z.boolean()]).optional(),
  any:      ()  => z.any().optional(),
  required: (s) => z.any().refine((x) => x !== undefined && x !== null && x !== "", "จำเป็นต้องส่งค่านี้").pipe(s),
  object:   (shape) => z.object(shape).passthrough(),
};

function formatIssues(location, issues) {
  return issues.map((i) => `${location}.${i.path.join(".") || "(root)"}: ${i.message}`);
}

/**
 * ตรวจ req.params / req.query / req.body ด้วย zod schema
 * ถ้าไม่ผ่านตอบ 400  error = "ข้อมูลไม่ถูกต้อง",  result = รายการ field ที่ผิด
 *
 *   router.put("/:plang_id", authentication, validate({ params: PlangIdParams, body: PlangBody }), ...)
 */
export function validate(schemas) {
  return async function (req, res, next) {
    const errors = [];
    for (const location of ["params", "query", "body"]) {
      if (!schemas[location]) continue;
      const parsed = schemas[location].safeParse(req[location] ?? {});
      if (!parsed.success) errors.push(...formatIssues(location, parsed.error.issues));
    }
    if (errors.length == 0) return next();

    const response = await setResponseError("ข้อมูลไม่ถูกต้อง");
    response.result = errors;
    return next(response);
  };
}
