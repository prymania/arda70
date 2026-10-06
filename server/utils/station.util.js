import { UPLOAD_IMAGE_FOLDER } from "../constants/image.const.js";
import { dateTimeToString } from "./datetime.util.js";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { setResponseNotFound, setResponseSuccess } from "./response.util.js";
import { conn } from "../configs/db.config.js";
import { log } from "console";
import { DISTRICT_STATION } from "../constants/table.const.js";


/**
 * @param {PICTURE_TABLE} String table to delete picture.
 * @param {picture_id} int picture_id to be deleted.
 */
export async function get_station_code(data) {
  let station_code ;

    const query = `SELECT
                    *,
                      (
                          6371 * 
                          acos(
                              cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + 
                              sin(radians(?)) * sin(radians(latitude))
                          )
                      ) AS distance
                  FROM STATION
                  WHERE	station_type = ?
                  ORDER BY distance
                  LIMIT 1`    
    const [results] = await conn.query(query, [
        data.latitude, data.longitude, data.latitude, DISTRICT_STATION
    ]);
    station_code = results[0].station_code;

  return station_code;
}

export function get_date_rank(){
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the actual month
  const day = currentDate.getDate();
  const rank =  (day <=10) ? 1 :
                (day <=20) ? 2 : 3;
  return {year: year,
          month: month,
          day:  day,
        rank: rank};
}

export function rai_to_msquare(rai, ngan, wa){
  return rai*1600 + ngan*400 + wa*4;
}

export function msquare_to_rai(area){
  // Conversion factors
  const SQUARE_METERS_IN_RAI = 1600;
  const SQUARE_METERS_IN_NGAN = 400;
  const SQUARE_METERS_IN_WAH = 4;

  // Calculate the area in each unit
  const rai = Math.floor(area / SQUARE_METERS_IN_RAI);
  const remainder1 = area % SQUARE_METERS_IN_RAI;
  const ngan = Math.floor(remainder1 / SQUARE_METERS_IN_NGAN);
  const remainder2 = remainder1 % SQUARE_METERS_IN_NGAN;
  const wa = remainder2 / SQUARE_METERS_IN_WAH;

  return { rai, ngan, wa };
}


export function get_lat_long_point_array(lat_long_string){
  // for ex: lat_long_string  = 16.37,103.81 16.37,103.82 16.37,103.88 16.36,103.87
  // return point array
  const latLongPairs = lat_long_string.split(' ');     // Split lat_long string into latitude and longitude pairs

  const points = latLongPairs.map(latLonStr => {     // Convert latitude and longitude pairs into points
      const [lat, lon] = latLonStr.split(',').map(parseFloat);
      return { latitude: lat, longitude: lon };
  });
  return points;
}
export function get_center_point(points){ // get center point of PLANG
  // Calculate center point
  const numPoints = points.length;
  let sumLat = 0;
  let sumLon = 0;
  points.forEach(point => {
      sumLat += point.latitude;
      sumLon += point.longitude;
  });
  const centerLat = sumLat / numPoints;
  const centerLon = sumLon / numPoints;

  return `${centerLat},${centerLon}`;

}
