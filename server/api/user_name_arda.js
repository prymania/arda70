
import { USER_NAME } from "../constants/username.const.js";


import fs from 'fs';
import xlsx from 'xlsx';
import { hashData } from "../utils/command.util.js";
// import { conn } from "../configs/db.config.js";
import { setResponseError, setResponseSuccess } from "../utils/response.util.js";
import { conn } from "../configs/db.config.js";
import { log } from "console";

import geolib from 'geolib';
import { MSQUARE_TO_RAI } from "../constants/table.const.js";
import { get_center_point, get_lat_long_point_array, msquare_to_rai, rai_to_msquare } from "../utils/station.util.js";

export async function insertUserData(data) {
    try {
      console.log("insertUserData");

      const query = `insert IGNORE into USERS(
                    username,       password,       salt,       title,      name,
                    surname,        email,          idcard,     gender,     birthday,
                    address_code,   houseid,        moo,        village,    road,
                    subdistrict,    district,       province,   post,       phone,
                    user_role,      education
                    ) 
                    values  ?`;
      const [rows, fields] =  await conn.query(query,[data]);
      console.log("==> FINISHED: INSERT User ");

      return rows.affectedRows==0 ?
            setResponseError(`ไม่สามารถเพิ่มข้อมูล user:`) :
            setResponseSuccess(`insert user successfully  : `);
    } catch (error) {
      return setResponseError(error)
    }
}

export async function insertUserRole(data) {
    try {
      console.log("insertUserRole");

      const query = `insert IGNORE into USER_ROLE(
                    username,       roleid
                    ) 
                    values  ?`;
      const [rows, fields] =  await conn.query(query,[data]);
      console.log("==> FINISHED: INSERT USER_ROLE.");

      return rows.affectedRows==0 ?
            setResponseError(`ไม่สามารถเพิ่มข้อมูล user role:`) :
            setResponseSuccess(`insert user role successfully  : `);
    } catch (error) {
      return setResponseError(error)
    }
}


function get_user_data(user){
    // const passwordi = hashData(user.password);   //toget hash-password, salt
    const passwordi = hashData(user.username.toString());
    let datai = []      // array for each data i
    datai.push(
        user.username.toString(),
        passwordi.hashData,
        passwordi.salt,
        user.title,
        user.name,

        user.surname,
        user.email,
        user.idcard,
        user.gender,
        user.birthday,
        
        user.address_code,
        user.houseid,
        user.moo,
        user.village,
        user.road,
        
        user.subdistrict,
        user.district,
        user.province,
        user.postcode,
        user.phone,

        user.user_role,
        user.education
    )

    const newData = datai.map((element)=>(element == null ? '' : element)); // replace null with ''
    return newData;

}
export function importUserFromFile(filename, user_role){
    const workbook = xlsx.readFile(filename);
    const sheetName = workbook.SheetNames[0];       // farmer at sheet#0
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log(sheetName)
    console.log(data);

    let all_user_data = []  //  2D array to record all user
    let all_user_role = [];  // 

    for(var i = 0; i< data.length; i++){  
        var datai = get_user_data(data[i]);
        all_user_data.push(datai);  
        all_user_role.push([data[i].username, user_role]);        // insert USER_ROLE table
    }
    insertUserData(all_user_data);
    // insertUserRole(all_user_role);
}


export function printUser(){
    for(var i=0;i<USER_NAME.length;i++){
        var password = USER_NAME[i][0];

        var dataHash = hashData(password);

        var text = `INSERT INTO USERS(
            username,   password,   salt) VALUES 
        ('${USER_NAME[i]}', '${dataHash.hashData}', '${dataHash.salt}');\n`

        fs.appendFile('e:/insertuser_arda.sql',text, err=>{
            if(err){
                console.error(err);
            }
        })
    }
}


/********************************************************************** */
/*  เพิ่มข้อมูลแปลง จาก  data  ปีที่แล้ว********************************************* */
/********************************************************************** */


function get_plang_data(user){

    let datai = []      // array for each data i

    const points = get_lat_long_point_array(user.lat_long);     // ได้ points array จาก lat_lon string
    const center_point_string = get_center_point(points);       // ได้ center point ของแปลง
    const msquare = geolib.getAreaOfPolygon(points).toFixed(2); // ได้ msqure area, fix to 2 decimal points
    const {rai , ngan, wa} = msquare_to_rai(msquare);

    // console.log('\n=====================');
    // console.log(center_point_string);
    // console.log(msquare);
    // console.log(rai, ngan, wa);

    datai.push(     //ได้ข้อมูลจาก excel row by row
        user.username.toString(),
        user.lat_long,
        center_point_string,
        msquare,
        rai,
        ngan,
        wa.toFixed(2),
        user.address_code,
        user.plang_name,
        user.title_deed,
        user.own_type,
        user.detail
    )

    const newData = datai.map((element)=>(element == null ? '' : element)); // replace null with ''
    
    return newData;
}

export async function insertUserPlang(data) {
    try {
      console.log("insertUserPlang");

      const query = `insert  into PLANG(
                    username, lat_long, center, msquare, rai, ngan, wa, address_code,
                    plang_name, title_deed, own_type, detail
                    ) 
                    values  ?`;
      const [rows, fields] =  await conn.query(query,[data]);
      console.log("==> FINISHED: INSERT PLANG ");

      return rows.affectedRows==0 ?
            setResponseError(`ไม่สามารถเพิ่มข้อมูล plang:`) :
            setResponseSuccess(`insert plang successfully  : `);
    } catch (error) {
      return setResponseError(error)
    }
}

export function importUserPlangFromFile(filename){
    const workbook = xlsx.readFile(filename);
    const sheetName = workbook.SheetNames[0];       // farmer at sheet#0
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);   //convert data to JSON

    // console.log(data);

    let all_plang_data = []  //  2D array to record all user

    for(var i = 0; i< data.length; i++){  
        var datai = get_plang_data(data[i]);
        all_plang_data.push(datai);  
    }
    // console.log(all_plang_data);
    // insertUserPlang(all_plang_data);
}