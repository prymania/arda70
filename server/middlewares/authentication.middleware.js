import { setLogger } from "../utils/logger.util.js";
import { STATE } from "../constants/status.const.js";
import dotenv from "dotenv";
dotenv.config();
const logger = setLogger(import.meta.url);
import { promisify } from "util";
// import { getNamespaceKey, getRedisJsonData } from "../utils/redis.util.js";
// import { NAMESPACE } from "../constants/redis.const.js";
// import { LoginsRepo } from "../repositories/login.repository.js";
import {
  setResponseError,
  setResponseErrorAuth,
} from "../utils/response.util.js";
import {
  JWT_ERROR,
  verifyaccess_token,
  verifyRefreshToken,
} from "../utils/jwt.util.js";

import { jsonErrorFormat } from "../utils/json.format.util.js";
import { findlogin_uuidService } from "../api/auth/auth.js";
import { log } from "console";
import { BEARER_TOKEN } from "../constants/config.const.js";

/**
 * @param {Request} request HTTP request argument to the middleware function.
 * @param {Response} response HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function authentication(request, response, next) {
  try {

    // * Get token from headers
    const tokenHeader = request.headers.authorization;


    if (!tokenHeader) {
      logger.error(`[error1] ไม่พบ Access token กรุณาตรวจสอบหรือขอใหม่`);
      return next(
        await setResponseErrorAuth("[error1] ไม่พบ Access token กรุณาตรวจสอบหรือขอใหม่")
      );
    }


    // * Split token from string
    let token = "";
    if (tokenHeader && tokenHeader.startsWith(BEARER_TOKEN)) {
      token = tokenHeader.split(" ")[1];
    }
    if (!token) {
      logger.error(`[error2] incorrect Bearer format, รูปแบบ Access token ไม่ถูกต้อง`);
      return next(
        await setResponseErrorAuth("[error2] incorrect Bearer format, รูปแบบ Access token ไม่ถูกต้อง")
      );
    }

    // * Verify token
    const decode = verifyaccess_token(token);

    if (decode.state != STATE.SUCCESS) {
        return next( await setResponseErrorAuth("[error3] token error กรุณาเข้าสู่ระบบอีกครั้ง"));
    }

    // * Check in database
    const login_state_result = await findlogin_uuidService(decode.payload.login_uuid);


    if (login_state_result !== STATE.SUCCESS) {
      logger.error(`[error4] Aceess token expired: กรุณาเข้าสู่ระบบอีกครั้ง`);
      return next( await setResponseErrorAuth( "[error4] Aceess token expired: กรุณาเข้าสู่ระบบอีกครั้ง"));
    }

    //assign decode token to request (username, address_code)
    request.username = decode.payload.username;
    request.login_uuid = decode.payload.login_uuid;
    request.address_code = decode.payload.address_code;

    next();
  } catch (error) {
    logger.error(`[error5] : authentication : ${jsonErrorFormat(error)}`);
    const result = await setResponseError(
      "[error5] เกิดข้อผิดพลาด ระบบไม่สามารถทำงานได้ (Token expired.)"
    );
    return next(result);
  }
}

/**
 * @param {Request} request HTTP request argument to the middleware function.
 * @param {Response} response HTTP response argument to the middleware function.
 * @param {NextFunction} next Callback argument to the middleware function.
 */
export async function authenticationRefereshToken(request, response, next) {
  try {
    // * Get token from headers
    let tokenHeader = request.headers.authorization;
    if (!tokenHeader) {
      logger.error(`Refresh Token is not found or undefined.`);
      return next(await setResponseErrorAuth("ไม่พบ Refresh token กรุณาเข้าสู่ระบบอีกครั้ง"));
    }
    // * Split token from string
    let token = "";
    if (tokenHeader && tokenHeader.startsWith(BEARER_TOKEN)) {
      token = tokenHeader.split(" ")[1];
    }
    if (!token) {
      logger.error(`Refresh Token is not found or incorrect Bearer format.`);
      return next(await setResponseErrorAuth("ไม่พบ Refresh token กรุณาเข้าสู่ระบบอีกครั้ง"));
    }

    // * Verify token
    const decode = verifyRefreshToken(token);
    if (decode.state != STATE.SUCCESS) {
      return next(await setResponseErrorAuth(
        JWT_ERROR.JWT_EXPIRED == decode.payload
          ? "Refresh token นี้หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง"
          : "Refresh token นี้ไม่ถูกต้อง กรุณาเข้าสู่ระบบอีกครั้ง"
      ));
    }

    // * Check in database  (findlogin_uuidService คืนค่าเป็น STATE ไม่ใช่ object)
    const login_state_result = await findlogin_uuidService(decode.payload.login_uuid);
    if (login_state_result !== STATE.SUCCESS) {
      logger.error(`Refresh Token is not store in database.`);
      return next(await setResponseErrorAuth("Refresh token นี้ไม่ถูกต้อง กรุณาเข้าสู่ระบบอีกครั้ง"));
    }
    request.username = decode.payload.username;
    request.login_uuid = decode.payload.login_uuid;
    request.address_code = decode.payload.address_code;
    next();
  } catch (error) {
    logger.error(`Error : authenticationRefreshToken : ${jsonErrorFormat(error)}`);
    return next(await setResponseError("เกิดข้อผิดพลาด ระบบไม่สามารถทำงานได้ (Token expired.)"));
  }
}
