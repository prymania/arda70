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




// export async function mhciAPI(){
//     let url = 'https://dssa.msu.ac.th:9999/v1/dashboard/district_name?address_code=6001';
//     const job = schedule.scheduleJob('*/1 0 0 * * *', function(){ // run every midnight
//     // const job = schedule.scheduleJob('*/10 * * * *', function(){ // run every minute
//         const getPost = () => {
//             fetch(url)
//               .then(response => response.json())
//               .then(data => {
//                 console.log(data, data.result, data.result.name);
//                 const name = data.result.name
//                 insertMentalHealthData(name);
//             }
//             );
//           };
//           const data = getPost();
//       });
// }



// THIS IS WORKING PERFECTLY WITHOUT SCHEDULE
export async function testAPI(){

  let url = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php';


  let response = await fetch(
    url,
    { method:   'GET', 
      headers:  { 
                  'Content-Type':   'application/json;charset=utf-8',
                  'API_KEY':       'CheckIn-MEA'
                }
    });

    let results = await response.json();
    
    console.log(typeof results);
    const keys = Object.keys(results);
    if (typeof results === 'object' && results !== null) {
      // Get the number of keys in the object
      console.log('Number of keys in results:', keys.length);
      console.log('keys[0] : ', keys[0]);
      console.log('keys : ', keys);
    } 

    console.log(results.stations);
    

}


// THIS IS WORKING PERFECTLY WITHOUT SCHEDULE
export async function testAPI_WellWater(){

  let url = 'https://pasutara.dgr.go.th/api_well/api/FindWellAll';


  let response = await fetch(
    url,
    { method:   'GET', 
      headers:  { 
                  'Content-Type':   'application/json;charset=utf-8',
                  'API_KEY':       'CheckIn-MEA'
                }
    });

    let results = await response.json();
    
    console.log(typeof results);
    if (typeof results === 'object' && results !== null) {
      // Get the number of keys in the object
      const keys = Object.keys(results);
      console.log('Number of keys in results:', keys.length);
      console.log(keys[0]);
      console.log(keys);
    } 
    let resultsLength;

    // Check if results is an array
    if (Array.isArray(results)) {
        resultsLength = results.length;
    } 
    // Check if results is an object
    else if (typeof results === 'object' && results !== null) {
        resultsLength = Object.keys(results).length;
    } 
    // If results is neither an array nor an object
    else {
        console.log('Results is not iterable.');
        resultsLength = 0;
    }

    console.log('Length of results:', resultsLength);

    let resultsData;

    // Check if 'result' key exists in results and if it's an array
    if (Array.isArray(results.result)) {
        resultsData = results.result;
    } else {
        console.log('Result data not found or is not an array.');
        resultsData = [];
    }

    console.log('Length of results data:', resultsData.length);
    
    // Now you can work with the actual data in resultsData array
    // For example, you can iterate over the array and process each item

    // Example: Logging each item in resultsData array
    resultsData.forEach(item => {
        // console.log(item);
        console.log(item.no, item.locat, item.mubanname);

    });

}

