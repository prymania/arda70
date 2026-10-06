import { conn } from "../../configs/db.config.js";
import {
  deCodeHashData,
  hashData,
} from "../../utils/command.util.js";
import {
  setResponseDuplicate,
  setResponseError,
  setResponseNotFound,
  setResponseSuccess,
} from "../../utils/response.util.js";
import { logFoundRecords } from "../../utils/logger.util.js";
import { changeFileName, deletePictureFile } from "../../utils/picture.util.js";
import { response } from "express";
import { ALERT_ANNOUNCEMENT_ID, ROLE_DISTRICT_OFFICER } from "../../constants/table.const.js";
import { get_district_address_code } from "../../utils/address_code.util.js";

import axios from "axios";

export async function insertStationsCO(data){
  try {
    console.log("insertStationsCODEdata");

    const query = `insert into STATION_CODE(
                        sid,station_code, nameTH, nameEN, areaTH, station_type, latitude, longitude ) values  ?`;

    const [rows, fields] =  await conn.query(query,[data]);
    console.log("INSERT STATION_CODE COMPLETED");

    return rows.affectedRows==0 ?
          setResponseError(`ไม่สามารถเพิ่มข้อมูล stationCO:`) :
          setResponseSuccess(`insert station CODE successfully  : `);
  } catch (error) {
    return setResponseError(error)
  }  
}

// THIS IS WORKING PERFECTLY WITHOUT SCHEDULE
export async function api_station_co_MASTER(){

  const url = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php';

  const rawData = await axios.get(url);
  const data = rawData?.data;
  const jsonData = JSON.stringify(data)
  
  // console.log(data);

  console.log('data :', typeof data);
  console.log('jsonData :', typeof jsonData);
  const stations = data.stations;
  console.log('stations :', typeof stations);

  const station_code  = stations.map(data => data.stationID);
  const nameTH        = stations.map(data => data.nameTH);
  const nameEN        = stations.map(data => data.nameEN);
  const areaTH        = stations.map(data => data.areaTH);
  const station_type  = stations.map(data => data.stationType);
  const latitude      = stations.map(data => data.lat);
  const longitude     = stations.map(data => data.long);

  let all_stations_data = [];
  for (let i = 0; i < station_code.length; i++){
    all_stations_data.push([i+1, station_code[i], nameTH[i], nameEN[i], areaTH[i], station_type[i], latitude[i], longitude[i]]);
  }

  // console.log(all_stations_data[0]);
  insertStationsCO(all_stations_data)

  // const aqilast = stations.map(data => data.AQILast);
  // const o3 = aqilast.map(data => data.O3);
  // console.log(nameTH[0], nameEN[0], aqilast[0].O3);

  // console.log("length of data ", nameTH.length);

  // const stationData = {
  //   nameTH : stations.map(data => data.nameTH), 
  //   nameEN : stations.map(data => data.nameTH)};

  // console.log(typeof stationData);

  // for( let key in stationData){
  //   if(stationData.hasOwnProperty(key)){
  //     console.log(`key : ${key} , value : ${stationData[key]}`);
  //   }
  // }


  // let response = await fetch(
  //   url,
  //   { method:   'GET', 
  //     headers:  {'Content-Type':   'application/json;charset=utf-8'},
  //   });

  //   let results = await response.json();
    
  //   console.log(typeof results);

  //   let json = JSON.stringify(results, null, 2);
  //   console.log(typeof json);

  //   console.log(json.stations);

    // const keys = Object.keys(results);
    // if (typeof results === 'object' && results !== null) {
    //   // Get the number of keys in the object
    //   console.log('Number of keys in results:', keys.length);
    //   console.log('keys[0] : ', keys[0]);
    //   console.log('keys : ', keys);
    // } 

    // // console.log(results.stations);

    // // const stationID = results.stations.map(station => station.stationID);
    // // console.log(stationID);
    // const aqilast = results.stations.map(data => data.AQILast);
    // console.log(aqilast);
    // // console.log(aqilast.map(data => data.date));
    // console.log(results.stations.AQILast);





}
