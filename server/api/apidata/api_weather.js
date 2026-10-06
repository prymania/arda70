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


// THIS IS WORKING PERFECTLY WITHOUT SCHEDULE
export async function api_weather(){

  let url = `https://data.tmd.go.th/api/WeatherToday/V2/?uid=${process.env.TMD_UID}&ukey=${process.env.TMD_UKEY}&format=json`;
  // let url = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php';


}
