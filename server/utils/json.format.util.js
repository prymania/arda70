import { serializeError } from "serialize-error";

/**
 * @param {object} data argument is error data.
 */
export function jsonErrorFormat(error) {
  return JSON.stringify(serializeError(error), null, 4);
}

/**
 * @param {object} data argument is any type.
 */
export function jsonDataFormat(data) {
  return JSON.stringify(data, null, 4);
}

/**
 * @param {object} data argument is any type.
 */
export function setNullFormat(data) {
  return data.length==0 ? "" : data;
}
