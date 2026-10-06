/**
 * ACTION SERVICES
 */

import { conn } from "../../configs/db.config.js";
import {
  setResponseSuccess,
  setResponseError,
  setResponseNotFound
} from "../../utils/response.util.js";



/* ============================================================================
   ACTION (Mobile): Load steps
   ============================================================================
*/

/**
 * Load Step1 or children of a given action
 */
export async function getActionChildrenService(data) {
  try {
    console.log("getActionChildrenService");

    let query = "";
    let params = [];

    // ถ้าไม่ส่ง parent_id → โหลด Step1 ของ action_type
    if (!data.parent_id) {
      query = `
        SELECT action_id, action_type, step, name
        FROM ACTION_MASTER
        WHERE action_type = ?
          AND step = 1
        ORDER BY action_id
      `;
      params = [data.action_type];
    } else {
      // โหลด children
      query = `
        SELECT DISTINCT 
        M.action_id,
        M.action_type,
        M.step,
        M.name
        FROM ACTION_FLOW F
        JOIN ACTION_MASTER M ON M.action_id = F.child_action_id
        JOIN ACTION_MASTER P ON P.action_id = F.parent_action_id
        WHERE F.parent_action_id = ?
          AND M.step = P.step + 1
        ORDER BY M.action_id;

      `;
      params = [data.parent_id];
    }

    const [rows] = await conn.query(query, params);

    return rows.length === 0
      ? setResponseNotFound("ไม่พบข้อมูล action")
      : setResponseSuccess(rows);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Load a single action detail
 */
export async function getActionDetailService(data) {
  try {
    console.log("getActionDetailService");

    const query = `
      SELECT action_id, action_type, step, name
      FROM ACTION_MASTER
      WHERE action_id = ?
    `;

    const [rows] = await conn.query(query, [data.action_id]);

    return rows.length === 0
      ? setResponseNotFound(`ไม่พบ action_id: ${data.action_id}`)
      : setResponseSuccess(rows[0]);

  } catch (error) {
    return setResponseError(error);
  }
}




/* ============================================================================
   ACTION MASTER (Admin CRUD)
   ============================================================================
*/

/**
 * Load all action master
 */
export async function selectAllActionMasterService() {
  try {
    console.log("selectAllActionMasterService");

    const query = `
      SELECT action_id, action_type, step, name
      FROM ACTION_MASTER
      ORDER BY action_type, step, name
    `;

    const [rows] = await conn.query(query);

    return setResponseSuccess(rows);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Insert new action master
 */
export async function insertActionMasterService(data) {
  try {
    console.log("insertActionMasterService");

    const query = `
      INSERT INTO ACTION_MASTER(action_type, step, name)
      VALUES (?, ?, ?)
    `;

    const [result] = await conn.query(query, [
      data.action_type,
      data.step,
      data.name
    ]);

    return result.affectedRows === 0
      ? setResponseNotFound(`เพิ่ม action master ไม่สำเร็จ`)
      : setResponseSuccess("เพิ่ม action master สำเร็จ");

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Update action master
 */
export async function updateActionMasterService(data) {
  try {
    console.log("updateActionMasterService");

    const query = `
      UPDATE ACTION_MASTER
      SET action_type = ?, step = ?, name = ?
      WHERE action_id = ?
    `;

    const [result] = await conn.query(query, [
      data.action_type,
      data.step,
      data.name,
      data.action_id
    ]);

    return result.affectedRows === 0
      ? setResponseNotFound(`ไม่พบ action_id: ${data.action_id}`)
      : setResponseSuccess(`แก้ไข action สำเร็จ`);

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Delete action master
 */
export async function deleteActionMasterService(data) {
  try {
    console.log("deleteActionMasterService");

    const query = `
      DELETE FROM ACTION_MASTER
      WHERE action_id = ?
    `;

    const [result] = await conn.query(query, [data.action_id]);

    return result.affectedRows === 0
      ? setResponseNotFound(`ไม่พบ action_id: ${data.action_id}`)
      : setResponseSuccess(`ลบ action สำเร็จ`);

  } catch (error) {
    return setResponseError(error);
  }
}




/* ============================================================================
   ACTION FLOW (Tree Mapping)
   ============================================================================
*/

/**
 * Insert flow mapping
 */
export async function insertActionFlowService(data) {
  try {
    console.log("insertActionFlowService");

    const query = `
      INSERT INTO ACTION_FLOW(parent_action_id, child_action_id, action_type)
      VALUES (?, ?, ?)
    `;

    const [result] = await conn.query(query, [
      data.parent_action_id,
      data.child_action_id,
      data.action_type
    ]);

    return result.affectedRows === 0
      ? setResponseNotFound(`เพิ่ม mapping ไม่สำเร็จ`)
      : setResponseSuccess("เพิ่ม parent-child mapping สำเร็จ");

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Delete parent-child mapping
 */
export async function deleteActionFlowService(data) {
  try {
    console.log("deleteActionFlowService");

    const query = `
      DELETE FROM ACTION_FLOW
      WHERE parent_action_id = ?
        AND child_action_id = ?
    `;

    const [result] = await conn.query(query, [
      data.parent_action_id,
      data.child_action_id
    ]);

    return result.affectedRows === 0
      ? setResponseNotFound("ไม่พบ mapping ที่จะลบ")
      : setResponseSuccess("ลบ mapping สำเร็จ");

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Get children of an action
 */
export async function selectActionChildrenFlowService(data) {
  try {
    console.log("selectActionChildrenFlowService");

    const query = `
      SELECT M.action_id, M.step, M.name 
      FROM ACTION_FLOW F
      JOIN ACTION_MASTER M ON M.action_id = F.child_action_id
      WHERE F.parent_action_id = ?
      ORDER BY M.step, M.name
    `;

    const [rows] = await conn.query(query, [data.action_id]);

    return rows.length === 0
      ? setResponseNotFound("ไม่พบ children")
      : setResponseSuccess(rows);

  } catch (error) {
    return setResponseError(error);
  }
}




/* ============================================================================
   USER ACTION LOG (History)
   ============================================================================
*/

/**
 * Insert action log
 */
export async function insertActionLogService(data) {
  try {
    console.log("insertActionLogService");

    const query = `
      INSERT INTO USER_ACTIVITY_ACTION_LOG(
        activity_id, action_id, step, start_date, end_date
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await conn.query(query, [
      data.activity_id,
      data.action_id,
      data.step,
      data.start_date,
      data.end_date
    ]);

    return result.affectedRows === 0
      ? setResponseNotFound("ไม่สามารถเพิ่ม log ได้")
      : setResponseSuccess("เพิ่ม action log สำเร็จ");

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Update log (typically end_date)
 */
export async function updateActionLogService(data) {
  try {
    console.log("updateActionLogService");

    const query = `
      UPDATE USER_ACTIVITY_ACTION_LOG
      SET end_date = ?
      WHERE log_id = ?
    `;

    const [result] = await conn.query(query, [
      data.end_date,
      data.log_id
    ]);

    return result.affectedRows === 0
      ? setResponseNotFound(`ไม่พบ log_id: ${data.log_id}`)
      : setResponseSuccess("อัปเดต action log สำเร็จ");

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Delete action log
 */
export async function deleteActionLogService(data) {
  try {
    console.log("deleteActionLogService");

    const query = `
      DELETE FROM USER_ACTIVITY_ACTION_LOG
      WHERE log_id = ?
    `;

    const [result] = await conn.query(query, [data.log_id]);

    return result.affectedRows === 0
      ? setResponseNotFound(`ไม่พบ log_id: ${data.log_id}`)
      : setResponseSuccess("ลบ action log สำเร็จ");

  } catch (error) {
    return setResponseError(error);
  }
}



/**
 * Select logs by activity
 */
export async function selectActionLogByActivityService(data) {
  try {
    console.log("selectActionLogByActivityService");

    const query = `
      SELECT log_id, activity_id, action_id, step, start_date, end_date
      FROM USER_ACTIVITY_ACTION_LOG
      WHERE activity_id = ?
      ORDER BY start_date DESC
    `;

    const [rows] = await conn.query(query, [data.activity_id]);

    return rows.length === 0
      ? setResponseNotFound("ไม่พบ log ของ activity นี้")
      : setResponseSuccess(rows);

  } catch (error) {
    return setResponseError(error);
  }
}




