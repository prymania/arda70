import { setLogger } from "../utils/logger.util.js";
import { jsonErrorFormat } from "../utils/json.format.util.js";
import { INTERNAL_ERROR_MESSAGE } from "../utils/response.util.js";
const logger = setLogger(import.meta.url);

/**
 * ตรวจว่าสิ่งที่ส่งมากับ next() เป็น response ของระบบ ({code, result, error}) หรือเป็น exception ที่หลุดมา
 * ถ้าเป็น exception จะ log ไว้และแปลงเป็น 500 พร้อมข้อความกลาง ๆ (ไม่ส่งรายละเอียด error ให้ client)
 */
export function normalizeResponse(res_data) {
  if (res_data instanceof Error || !res_data || typeof res_data.code !== "number") {
    logger.error(`Unhandled error : ${jsonErrorFormat(res_data)}`);
    return { code: 500, result: null, error: INTERNAL_ERROR_MESSAGE };
  }
  return res_data;
}

/**
 * response handler ของ /v1  (คงรูปแบบเดิมไว้ เพื่อไม่ให้กระทบ front end)
 * - 200, 204           -> HTTP 200 (body.code บอกว่า 200 หรือ 204)
 * - 400, 401, 403, 404 -> HTTP ตาม code
 * - อื่น ๆ (409, 500)   -> body.code 400 เหมือนเดิม (409 -> HTTP 409, 500 -> HTTP 400)
 */
export async function responseHandler (res_data, request, response, next) {
  try {
    res_data = normalizeResponse(res_data);

    let json_data = {};
    let http_status = 400;
    if (res_data.code == 200) {
      json_data = { code: 200, result: res_data.result ?? null };
      http_status = 200;
    } else if (res_data.code == 204) {
      json_data = { code: 204, result: res_data.result, error: res_data.error };
      http_status = 200;
    } else if ([400, 401, 403, 404].includes(res_data.code)) {
      json_data = { code: res_data.code, result: res_data.result, error: res_data.error };
      http_status = res_data.code;
    } else {
      // ของเดิม: 409 -> HTTP 409 แต่ body.code 400,  error จาก DB เคยเป็น 400 จึงคง 400 ไว้
      json_data = { code: 400, result: res_data.result, error: res_data.error };
      http_status = res_data.code == 500 ? 400 : res_data.code;
    }

    return response.status(http_status).json(json_data);
  }
  catch (error) {
    logger.error(`responseHandler : ${jsonErrorFormat(error)}`);
    return response.status(500).json({ code: 500, result: null, error: INTERNAL_ERROR_MESSAGE });
  }
};

/**
 * response handler ของ /v2  ส่ง HTTP status ตรงกับ body.code
 * - 200 OK, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Error
 * - 204 (ไม่พบข้อมูล) ยังตอบ HTTP 200 พร้อม body.code = 204 เหมือน v1  (HTTP 204 ส่ง body ไม่ได้)
 */
export async function responseHandlerV2 (res_data, request, response, next) {
  try {
    res_data = normalizeResponse(res_data);
    const http_status = res_data.code == 204 ? 200 : res_data.code;
    const json_data = res_data.code == 200
      ? { code: 200, result: res_data.result ?? null }
      : { code: res_data.code, result: res_data.result ?? null, error: res_data.error ?? null };
    return response.status(http_status).json(json_data);
  }
  catch (error) {
    logger.error(`responseHandlerV2 : ${jsonErrorFormat(error)}`);
    return response.status(500).json({ code: 500, result: null, error: INTERNAL_ERROR_MESSAGE });
  }
};
