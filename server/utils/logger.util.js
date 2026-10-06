import path from "path";
import { fileURLToPath } from "url";
import loggerConfig from "../configs/logger.config.js";
import { setResponseNotFound, setResponseSuccess } from "./response.util.js";

/**
 * @param {string} path string argument is name file.
 */
export function setLogger(pathFile) {
  return loggerConfig(path.basename(fileURLToPath(pathFile)));
}

/**
 * @param {object} rows mysql return records.
 */
export function logFoundRecords(rows){
  if(rows.length === undefined)
    console.log(`==> Found records: ${rows.affectedRows}`);
  else
    console.log(`==> Found records: ${rows.length}`);
}

