/**
 * ACTION CONTROLLERS (Mobile + Admin + Log)
 */

import {
  // ACTION (mobile)
  getActionChildrenService,
  getActionDetailService,

  // ACTION MASTER (admin)
  selectAllActionMasterService,
  insertActionMasterService,
  updateActionMasterService,
  deleteActionMasterService,

  // ACTION FLOW (mapping)
  insertActionFlowService,
  deleteActionFlowService,
  selectActionChildrenFlowService,

  // USER ACTION LOG
  insertActionLogService,
  updateActionLogService,
  deleteActionLogService,
  selectActionLogByActivityService
} from "./action.js";



/* ============================================================================
   ACTION (Mobile): Load Steps
   ============================================================================
*/

/**
 * Load action steps based on parent_id or action_type
 * GET /action/steps
 */
export async function getActionChildrenController(req, res, next) {
  /* 
    #swagger.tags = ['Action'],
    #swagger.summary = "โหลดรายการ action ตาม parent_id"
    #swagger.description = "ใช้สำหรับ mobile app เพื่อโหลด Step1 → Step2 → Step3 <br>
    - ถ้าไม่ส่ง parent_id = โหลด Step1 <br>
    - ถ้าส่ง parent_id = โหลด children ของ action นั้น <br>"
  */
  try {
    const data = {
      parent_id: req.query.parent_id || null,
      action_type: req.query.action_type || null,
    };

    const result = await getActionChildrenService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * GET /action/:action_id
 */
export async function getActionDetailController(req, res, next) {
  /* 
    #swagger.tags = ['Action'],
    #swagger.summary = "โหลดข้อมูล action ตาม action_id"
    #swagger.description = "โหลดข้อมูล action เช่น ชื่อ, step, parent เป็นต้น <br>"
  */
  try {
    const data = {
      action_id: req.params.action_id
    };

    const result = await getActionDetailService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}




/* ============================================================================
   ACTION MASTER (Admin CRUD)
   ============================================================================
*/

/**
 * GET /action/master
 */
export async function selectAllActionMasterController(req, res, next) {
  /* 
    #swagger.tags = ['ActionMaster'],
    #swagger.summary = "โหลด action master ทั้งหมด"
    #swagger.description = "โหลดรายการ action จาก ACTION_MASTER ทั้งหมด <br>"
  */
  try {
    const result = await selectAllActionMasterService();
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * POST /action/master
 */
export async function insertActionMasterController(req, res, next) {
  /* 
    #swagger.tags = ['ActionMaster'],
    #swagger.summary = "เพิ่ม action master ใหม่"
    #swagger.description = "เพิ่มข้อมูล action ใหม่ใน ACTION_MASTER <br>"
  */
  try {
    const data = {
      action_type: req.body.action_type,
      step: req.body.step,
      name: req.body.name
    };

    const result = await insertActionMasterService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * PUT /action/master/:action_id
 */
export async function updateActionMasterController(req, res, next) {
  /* 
    #swagger.tags = ['ActionMaster'],
    #swagger.summary = "แก้ไขข้อมูล action master"
    #swagger.description = "แก้ไข action เช่นชื่อไทย หรือ step <br>"
  */
  try {
    const data = {
      action_id: req.params.action_id,
      action_type: req.body.action_type,
      step: req.body.step,
      name: req.body.name
    };

    const result = await updateActionMasterService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * DELETE /action/master/:action_id
 */
export async function deleteActionMasterController(req, res, next) {
  /* 
    #swagger.tags = ['ActionMaster'],
    #swagger.summary = "ลบ action master"
    #swagger.description = "ลบ action จาก ACTION_MASTER ตาม action_id <br>"
  */
  try {
    const data = {
      action_id: req.params.action_id
    };

    const result = await deleteActionMasterService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}




/* ============================================================================
   ACTION FLOW (Mapping: Parent → Child)
   ============================================================================
*/

/**
 * POST /action/flow
 */
export async function insertActionFlowController(req, res, next) {
  /* 
    #swagger.tags = ['ActionFlow'],
    #swagger.summary = "เพิ่มความสัมพันธ์ parent → child"
    #swagger.description = "เพิ่ม mapping ของ tree เช่น Step1 → Step2 <br>"
  */
  try {
    const data = {
      parent_action_id: req.body.parent_action_id,
      child_action_id: req.body.child_action_id,
      action_type: req.body.action_type
    };

    const result = await insertActionFlowService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * DELETE /action/flow
 */
export async function deleteActionFlowController(req, res, next) {
  /* 
    #swagger.tags = ['ActionFlow'],
    #swagger.summary = "ลบความสัมพันธ์ parent → child"
    #swagger.description = "ลบ mapping parent-child จาก ACTION_FLOW <br>"
  */
  try {
    const data = {
      parent_action_id: req.body.parent_action_id,
      child_action_id: req.body.child_action_id
    };

    const result = await deleteActionFlowService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * GET /action/flow/children/:action_id
 */
export async function selectActionChildrenFlowController(req, res, next) {
  /* 
    #swagger.tags = ['ActionFlow'],
    #swagger.summary = "โหลด children ของ action ตาม action_id"
    #swagger.description = "ใช้ดูความสัมพันธ์ parent → child <br>"
  */
  try {
    const data = {
      action_id: req.params.action_id
    };

    const result = await selectActionChildrenFlowService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}




/* ============================================================================
   USER ACTION LOG (History)
   ============================================================================
*/

/**
 * POST /action/log
 */
export async function insertActionLogController(req, res, next) {
  /* 
    #swagger.tags = ['ActionLog'],
    #swagger.summary = "เพิ่มประวัติการทำ action"
    #swagger.description = "เก็บประวัติว่า user ทำ action ไหน วันไหน <br>"
  */
  try {
    const data = {
      activity_id: req.body.activity_id,
      action_id: req.body.action_id,
      step: req.body.step,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };

    const result = await insertActionLogService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * PUT /action/log/:log_id
 */
export async function updateActionLogController(req, res, next) {
  /* 
    #swagger.tags = ['ActionLog'],
    #swagger.summary = "อัปเดตประวัติการทำ action"
    #swagger.description = "เช่น ตั้ง end_date เมื่อผู้ใช้ทำงานเสร็จ <br>"
  */
  try {
    const data = {
      log_id: req.params.log_id,
      end_date: req.body.end_date
    };

    const result = await updateActionLogService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * DELETE /action/log/:log_id
 */
export async function deleteActionLogController(req, res, next) {
  /* 
    #swagger.tags = ['ActionLog'],
    #swagger.summary = "ลบประวัติการทำ action"
    #swagger.description = "ลบ record log ตาม log_id <br>"
  */
  try {
    const data = {
      log_id: req.params.log_id
    };

    const result = await deleteActionLogService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}



/**
 * GET /action/log/activity/:activity_id
 */
export async function selectActionLogByActivityController(req, res, next) {
  /* 
    #swagger.tags = ['ActionLog'],
    #swagger.summary = "โหลดประวัติ action ตาม activity_id"
    #swagger.description = "ดูว่าผู้ใช้ทำ activity อะไรไปแล้วบ้างในแปลงนี้ <br>"
  */
  try {
    const data = {
      activity_id: req.params.activity_id
    };

    const result = await selectActionLogByActivityService(data);
    return next(result);
  } catch (error) {
    return next(error);
  }
}
