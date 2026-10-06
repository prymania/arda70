import { setLogger } from "./logger.util.js";
const logger = setLogger(import.meta.url);
import jwt from "jsonwebtoken";
import { STATE } from "../constants/status.const.js";
import dotenv from "dotenv";
import { JWT_EXPIRED_MILLISECONDS, JWT_SECRET_TOKEN, JWT_SECRET_TOKEN_EXPIRES } from "../constants/config.const.js";
import { conn } from "../configs/db.config.js";
dotenv.config();
export const JWT_ERROR = {
  INVALID_TOKEN: "invalid token",
  JWT_MALFORMED: "jwt malformed",
  INVALID_SIGNATURE: "invalid signature",
  JWT_EXPIRED: "jwt expired",
};


/**
 * @param {login_data} login_data {ip, device, login_uuid, username, address_code}
 */
export async function createRefreshTokenService(login_data) {

  const refreshToken = createToken(login_data, JWT_SECRET_TOKEN, JWT_SECRET_TOKEN_EXPIRES);

  const refreshTokenExpiredDate = getTokenExpiredDate(refreshToken);

  const queryInsertLogin = `INSERT INTO LOGINS ( 
         login_ip, login_device, login_uuid, login_retoken, login_enable_flag, 
         login_created_date, login_retoken_expire_date, username)
          VALUE(?,?,?,?,?, ?,?,?)`;

  const insertLogin = await conn.execute(queryInsertLogin, [
                                          login_data.ip,
                                          login_data.device,
                                          login_data.login_uuid,
                                          refreshToken,
                                          true,
                                          new Date(),
                                          new Date(refreshTokenExpiredDate),
                                          login_data.username,
                                        ]);
  return refreshToken;
}


/**
 * @param {string} login_data login_data string data.
 * @param {string} token_text token_text string data.
 * @param {string} token_expired login uuid string data.
 */
export function createToken(login_data, secret_key, expiresIn ){

  const payload = {
    login_uuid:     login_data.login_uuid,
    username:       login_data.username,
    address_code:   login_data.address_code
  };

  const token = jwt.sign(payload, secret_key, {expiresIn: expiresIn} );
  return token;

}

export function getTokenExpiredDate(login_uuid) {
  const decode=jwt.decode(login_uuid)
  return decode.exp * JWT_EXPIRED_MILLISECONDS;
}

/**
 * @param {string} token jwt string data.
 */
export function verifyaccess_token(token) {
  try {
    let decode = jwt.verify(token, JWT_SECRET_TOKEN);
    return { state: STATE.SUCCESS, payload: decode };
  } catch (error) {
    logger.error(`Error : verifyaccess_token : ${error.message}`);
    return { state: STATE.FAILED, payload: error.message };
  }
}

/**
 * @param {string} token jwt string data.
 * หมายเหตุ: ตอนนี้ token ที่ออกให้ตอน login (ชื่อ refreshToken) ถูก sign ด้วย JWT_SECRET_TOKEN
 * จึงต้อง verify ด้วย secret เดียวกัน (ของเดิมอ้าง JWT_SECRET_REFRESH_TOKEN ที่ไม่ได้ import ทำให้ verify ไม่ผ่านทุกครั้ง)
 */
export function verifyRefreshToken(token) {
  try {
    let decode = jwt.verify(token, JWT_SECRET_TOKEN);
    return { state: STATE.SUCCESS, payload: decode };
  } catch (error) {
    logger.error(`Error : verifyRefreshToken : ${error.message}`);
    return { state: STATE.FAILED, payload: error.message };
  }
}
