import moment from "moment";

export function getDateTimeNow() {
  return moment();
}

/**
 * @param {string} datetime datetime string.
 */
export function stringToDateTime(datetime) {
  return moment(datetime).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}

/**
 * @param {string} datetime datetime string.
 */
export function stringToDate(datetime) {
  return moment(datetime).format("YYYY-MM-DD");
}

/**
 * @param {string} datetime datetime string.
 */
export function dateTimeToString(datetime) {
  return datetime
    ? moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    : moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}

/**
 * @param {string} date datetime string.
 */
export function dateToString(datdateetime) {
  return date
    ? moment(date).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
}

/**
 * @param {string} date date string.
 */
export function dateFormatValidate(date) {
  return moment(date, "YYYY-MM-DD", true).isValid();
}

/**
 * @param {string} datetime datetime string.
 */
export function dateTimeFormatValidate(datetime) {
  return moment(datetime, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid();
}

/**
 * @param {string} date date string.
 */
export function dateFromFormat(format, date) {
  return date ? moment().format(format) : moment(date).format(format);
}
