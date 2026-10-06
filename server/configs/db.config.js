import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// เลือกฐานข้อมูลจาก .env  (DB_TARGET=local | cloud)
// ไม่ต้องแก้โค้ดเวลาเปลี่ยน server อีกต่อไป
export const DB_TARGET = (process.env.DB_TARGET || "local").toLowerCase();

const DB_CONFIGS = {
  local: {
    host:     process.env.LOCAL_DATABASE_HOST,
    user:     process.env.LOCAL_DATABASE_USER,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    database: process.env.LOCAL_DATABASE_NAME,
  },
  cloud: {
    host:     process.env.CLOUD_DATABASE_HOST,
    user:     process.env.CLOUD_DATABASE_USER,
    password: process.env.CLOUD_DATABASE_PASSWORD,
    database: process.env.CLOUD_DATABASE_NAME,
    port:     process.env.CLOUD_DATABASE_PORT ? Number(process.env.CLOUD_DATABASE_PORT) : undefined,
  },
};

if (!DB_CONFIGS[DB_TARGET]) {
  throw new Error(`DB_TARGET ไม่ถูกต้อง: "${DB_TARGET}" (ใช้ได้: ${Object.keys(DB_CONFIGS).join(", ")})`);
}

// pool เดียวใช้ทั้งระบบ  ทุก service import { conn } จากไฟล์นี้
export const conn = mysql.createPool({ connectionLimit: 10, ...DB_CONFIGS[DB_TARGET] });
