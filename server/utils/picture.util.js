import { UPLOAD_IMAGE_FOLDER } from "../constants/image.const.js";
import { dateTimeToString } from "./datetime.util.js";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { setResponseNotFound, setResponseSuccess } from "./response.util.js";
import { conn } from "../configs/db.config.js";
import { log } from "console";





export function getAttachedFile(req) {

  return (!req.files || Object.keys(req.files).length === 0) ?
        null :
        req.files.file;
}

/**
 * @param {request} req   request.
 * @param {string} username username who upload file.
 * @param {string} filename_prefict image category - profile, plang, activity,diaster.
 */
export async function handleAttachedFile(req, username, filename_prefict){
  //check if there is a file
  //change filename
  // return filepath
  // ถ้ามีการupload file ให้เรียกฟังชันนี้อันเดียวเลย  (ต้อง await ด้วย)
  if (!req.files || Object.keys(req.files).length === 0){ // no attached file
    return '';
  }
  else{
    const attached_file = req.files.file;
    const filepath = changeFileName(username, attached_file, filename_prefict);
    // รอให้เขียนไฟล์เสร็จก่อน ถ้าเขียนไม่ได้จะ throw ออกไป controller จะไม่บันทึก path ลง DB
    await attached_file.mv(filepath);
    return filepath;
  }
}
/**
 * @param {username} String username who upload file.
 * @param {image_file} String image_file name.
 * @param {image_category} String image category - profile, plang, activity,diaster.
 */
export function changeFileName(username, image_file, image_category) {

  var cdate = dateTimeToString().replaceAll(":","_");
  cdate = cdate.replaceAll(".","_");
  cdate = cdate.substring(0, cdate.indexOf("+"))

  // กัน path traversal: ห้ามมี / \ หรือ .. ในชื่อโฟลเดอร์/ไฟล์
  const safe_username = String(username).replace(/[\/\\]/g, '_').replace(/\.\./g, '_');
  const new_filename = safe_username.concat(
      '_', image_category,'_', 
      cdate,
      path.extname(image_file.name));
  
  const filepath = UPLOAD_IMAGE_FOLDER.concat(`/`,safe_username,`/`, new_filename);
  
  return filepath;
}

/**
 * @param {PICTURE_TABLE} String table to delete picture.
 * @param {picture_id} int picture_id to be deleted.
 */
export async function deletePictureFile(PICTURE_TABLE, picture_id) {

  const select_image_query = `SELECT * from ?? where picture_id = ?`
  const [select_image, select_image_field] = await conn.query(select_image_query, [
    PICTURE_TABLE, picture_id
    ]);

  if (select_image.length == 0) {
    return -1;
  }
  else{

    var image_filename = select_image[0].picture;
    // ถ้าไฟล์หายไปแล้ว ก็ยังลบ record ใน DB ต่อได้
    if (image_filename && fs.existsSync(image_filename)) fs.unlinkSync(image_filename);
  
    const query = `delete from ?? where picture_id = ?`; 
  
    const [delete_image, delete_image_field] = await conn.query(query, [
      PICTURE_TABLE, picture_id
    ]);
  
    return delete_image.affectedRows;
  }
}

