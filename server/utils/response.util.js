import { setLogger } from "./logger.util.js";
import { jsonErrorFormat } from "./json.format.util.js";
const logger = setLogger(import.meta.url);

export const INTERNAL_ERROR_MESSAGE = "เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง";

export async function setResponseBody(code, result, error) {
  return {
    code: code,
    result: result,
    error: error,
  };
}
export async function setResponseSuccess(result) {
  return await setResponseBody(200, result, null);
}

/**
 * ถ้าส่ง Error object มา (เช่น error จาก MySQL ใน catch) จะไม่ส่งรายละเอียดกลับไปให้ client
 * แต่บันทึกลง log แทน แล้วตอบเป็น 500 พร้อมข้อความกลาง ๆ
 * ถ้าส่งข้อความ (string) มา จะตอบเป็น 400 เหมือนเดิม
 */
export async function setResponseError(error) {
  if (error instanceof Error) {
    return await setResponseServerError(error);
  }
  return await setResponseBody(400, null, error);
}
export async function setResponseServerError(error) {
  logger.error(`Internal error : ${jsonErrorFormat(error)}`);
  return await setResponseBody(500, null, INTERNAL_ERROR_MESSAGE);
}
export async function setResponseNotFound(msg) {
  return await setResponseBody(204, null, msg);
}
export async function setResponseDuplicate(msg) {
  return await setResponseBody(409, null, msg);
}
export async function setInfo(nameFile, http_code, msg) {
  return await setResponseBody(http_code, null, msg);
}
export async function setResponseErrorAuth(msg) {
  return await setResponseBody(401, null, msg);
}
export async function setResponseForbidden(msg) {
  return await setResponseBody(403, null, msg);
}
