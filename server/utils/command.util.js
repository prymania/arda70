import { randomBytes, scrypt, scryptSync, timingSafeEqual } from "crypto";
import { v4 as uuidv4 } from "uuid";
export function generateUuid() {

  return uuidv4();
}
export function hashData(value) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(value, salt, 64).toString("hex");
  const hashInfo = {
    salt:           salt,
    hashedPassword: hashedPassword,
  };
  return hashInfo;
}
export function deCodeHashData(data, inputsalt, password) {
  const key = data;
  const salt = inputsalt;
  const hashedBuffer = scryptSync(password, salt, 64);

  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  return match
}
