import dotenv from "dotenv";
dotenv.config();

//  SSL PATH configuration  (ตั้งค่าใน .env ได้  ถ้าไม่ตั้งจะใช้ cert ของ www.arda365days.com)
// ไฟล์ cert อยู่ใน server/ssl/ ซึ่งไม่ได้เก็บใน git แล้ว ต้อง copy ไปไว้บน server เอง
export const DOMAIN_NAME_PATH = process.env.SSL_CERT_PATH     || './server/ssl/www_arda365days_com.crt';
export const PRIVATE_KEY_PATH = process.env.SSL_KEY_PATH      || './server/ssl/www_arda365days_com_private.key';
export const CAROOT_CERT_PATH = process.env.SSL_CA_PATH       || './server/ssl/www_arda365days_com.ca-bundle';

//DUCK_SERVER
// SSL_CERT_PATH=./server/ssl/msu/2023wildcard_msu_ac.th.crt
// SSL_KEY_PATH=./server/ssl/msu/2023wildcard_msu_ac.th.key
// SSL_CA_PATH=./server/ssl/msu/DigiCertCA.crt
