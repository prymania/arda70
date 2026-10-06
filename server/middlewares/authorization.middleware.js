import { setLogger } from "../utils/logger.util.js";
import { jsonErrorFormat } from "../utils/json.format.util.js";
import { setResponseError, setResponseForbidden } from "../utils/response.util.js";
import { conn } from "../configs/db.config.js";
import { ROLE_ADMIN, ROLE_HEAD_CE, USERS_STATUS_ENABLE } from "../constants/table.const.js";
const logger = setLogger(import.meta.url);

// ใช้ต่อจาก authentication เสมอ  (ต้องมี req.username แล้ว)
//
//   router.delete("/users",   authentication, requireRole(ROLE_ADMIN), deleteUserController)
//   router.put("/plang_id",   authentication, requireOwner(["plang", req => req.body.plang_id]), updatePlangController)


/**
 * อ่าน role ของ user จาก DB (ใน JWT ไม่มี role) และเก็บไว้ที่ req.user_role
 * ถ้า user ยังไม่ถูก approve (user_status = 0) จะไม่นับ role ตั้งแต่ ROLE_HEAD_CE ขึ้นไป
 * @returns {Promise<number[]>}
 */
export async function getUserRoles(req) {
  if (Array.isArray(req.user_role)) return req.user_role;

  const [rows] = await conn.query(`select user_role, user_status from USERS where username = ?`, [req.username]);
  if (rows.length == 0) {
    req.user_role = [];
    return req.user_role;
  }

  const roles = String(rows[0].user_role ?? "").split(",").filter((r) => r !== "").map(Number);
  req.user_role = rows[0].user_status == USERS_STATUS_ENABLE ? roles : roles.filter((r) => r < ROLE_HEAD_CE);
  return req.user_role;
}

export const hasAnyRole   = (user_roles, roles) => user_roles.some((r) => roles.includes(r));
export const isAdmin      = (user_roles) => user_roles.includes(ROLE_ADMIN);
export const isStaff      = (user_roles) => user_roles.some((r) => r >= ROLE_HEAD_CE);   // หัวหน้าชุมชน/จนท. ขึ้นไป (รวม admin)


/**
 * อนุญาตเฉพาะ user ที่มี role อย่างน้อยหนึ่งตัวใน roles  (admin ผ่านทุกเส้น)
 * @param  {...number} roles
 */
export function requireRole(...roles) {
  return async function (req, res, next) {
    try {
      const user_roles = await getUserRoles(req);
      if (isAdmin(user_roles) || hasAnyRole(user_roles, roles)) return next();

      logger.warn(`[403] ${req.username} (role ${user_roles}) -> ${req.method} ${req.originalUrl}`);
      return next(await setResponseForbidden("ไม่มีสิทธิ์ใช้งานเส้นนี้"));
    } catch (error) {
      logger.error(`requireRole : ${jsonErrorFormat(error)}`);
      return next(await setResponseError(error));
    }
  };
}

/**
 * อนุญาตเฉพาะ user ที่มี role ตั้งแต่ ROLE_HEAD_CE ขึ้นไป (3, 4, 5, 6, 7, 9)
 */
export function requireStaff() {
  return async function (req, res, next) {
    try {
      const user_roles = await getUserRoles(req);
      if (isStaff(user_roles)) return next();

      logger.warn(`[403] ${req.username} (role ${user_roles}) -> ${req.method} ${req.originalUrl}`);
      return next(await setResponseForbidden("เส้นนี้สำหรับผู้นำชุมชน/เจ้าหน้าที่เท่านั้น"));
    } catch (error) {
      logger.error(`requireStaff : ${jsonErrorFormat(error)}`);
      return next(await setResponseError(error));
    }
  };
}


/**
 * SQL หาเจ้าของ (PLANG.username) ของข้อมูลแต่ละประเภท  ผลลัพธ์ต้องมีคอลัมน์ owner
 */
const ACTIVITY_OWNER_JOIN = `
  from ACTIVITY a
  left join PLANG    p1 on p1.plang_id    = a.plang_id
  left join SUBPLANG s  on s.subplang_id  = a.subplang_id
  left join PLANG    p2 on p2.plang_id    = s.plang_id`;

const OWNER_QUERIES = {
  plang:            `select username as owner from PLANG where plang_id = ?`,
  subplang:         `select p.username as owner from SUBPLANG s join PLANG p on p.plang_id = s.plang_id where s.subplang_id = ?`,
  activity:         `select coalesce(p1.username, p2.username) as owner ${ACTIVITY_OWNER_JOIN} where a.activity_id = ?`,
  disaster:         `select p.username as owner from DISASTER d join PLANG p on p.plang_id = d.plang_id where d.disaster_id = ?`,
  water_source:     `select p.username as owner from WATER_SOURCE w join PLANG p on p.plang_id = w.plang_id where w.wid = ?`,
  water_supply:     `select p.username as owner from WATER_SUPPLY w join PLANG p on p.plang_id = w.plang_id where w.wid = ?`,
  plang_picture:    `select p.username as owner from PLANG_PICTURE x join PLANG p on p.plang_id = x.plang_id where x.picture_id = ?`,
  subplang_picture: `select p.username as owner from SUBPLANG_PICTURE x join SUBPLANG s on s.subplang_id = x.subplang_id join PLANG p on p.plang_id = s.plang_id where x.picture_id = ?`,
  disaster_picture: `select p.username as owner from DISASTER_PICTURE x join DISASTER d on d.disaster_id = x.disaster_id join PLANG p on p.plang_id = d.plang_id where x.picture_id = ?`,
  activity_picture: `select coalesce(p1.username, p2.username) as owner ${ACTIVITY_OWNER_JOIN} join ACTIVITY_PICTURE x on x.activity_id = a.activity_id where x.picture_id = ?`,
  action_log:       `select coalesce(p1.username, p2.username) as owner ${ACTIVITY_OWNER_JOIN} join USER_ACTIVITY_ACTION_LOG l on l.activity_id = a.activity_id where l.log_id = ?`,
  alert:            `select username as owner from ALERT where alert_id = ?`,
};

/**
 * ให้แก้/ลบ/เพิ่มข้อมูลลูก ได้เฉพาะ
 *   - เจ้าของแปลง (PLANG.username) หรือเจ้าของ alert
 *   - หรือ ผู้นำชุมชน/เจ้าหน้าที่ (role >= ROLE_HEAD_CE) และ admin
 * ถ้าไม่ได้ส่ง id มา หรือหา record ไม่เจอ จะปล่อยผ่านให้ service ตอบ "ไม่พบข้อมูล" ตามเดิม
 *
 * @param  {...[string, (req) => any]} checks  [ประเภทข้อมูล, ฟังก์ชันดึง id จาก req]
 */
export function requireOwner(...checks) {
  for (const [resource] of checks) {
    if (!OWNER_QUERIES[resource]) throw new Error(`requireOwner: ไม่รู้จัก resource "${resource}"`);
  }

  return async function (req, res, next) {
    try {
      for (const [resource, getId] of checks) {
        const id = getId(req);
        if (id === undefined || id === null || id === "") continue;

        const [rows] = await conn.query(OWNER_QUERIES[resource], [id]);
        if (rows.length == 0) continue;
        if (rows[0].owner === req.username) continue;

        const user_roles = await getUserRoles(req);
        if (isStaff(user_roles)) continue;

        logger.warn(`[403] ${req.username} ไม่ใช่เจ้าของ ${resource}=${id} -> ${req.method} ${req.originalUrl}`);
        return next(await setResponseForbidden(`ไม่มีสิทธิ์แก้ไขข้อมูลนี้ (${resource}: ${id})`));
      }
      return next();
    } catch (error) {
      logger.error(`requireOwner : ${jsonErrorFormat(error)}`);
      return next(await setResponseError(error));
    }
  };
}
