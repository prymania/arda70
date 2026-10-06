# ARDA67 API

## เริ่มใช้งาน

```bash
npm install
cp .env.example .env        # แล้วใส่ค่าจริง (ขอจากหัวหน้าทีม ห้าม commit .env)
npm run dev                 # สร้าง swagger แล้วรันด้วย nodemon
```

เอกสาร API: `http://localhost:<PORT>/docs`  กด **Authorize** แล้วใส่ token จาก `/v1/auth/login`

## เลือก server ใน `.env` (ไม่ต้องแก้โค้ด)

| ใช้งาน | DB_TARGET | USE_HTTPS |
|---|---|---|
| เครื่อง local | `local` | `false` |
| cloud (production) | `cloud` | `true` |
| local แต่ต่อ DB cloud | `cloud` | `false` |

ไฟล์ SSL อยู่ที่ `server/ssl/` (ไม่อยู่ใน git) เปลี่ยน path ได้ด้วย `SSL_CERT_PATH`, `SSL_KEY_PATH`, `SSL_CA_PATH`

## โครงสร้าง

```
server/
  api/<module>/          v1  : <module>.routes.js, <module>.controllers.js, <module>.js (service + SQL)
  api_v2/<module>/       v2  : routes, controllers (เรียก controller/service ของ v1), <module>.schema.js (validate)
  middlewares/
    authentication       ตรวจ token
    authorization        requireRole(...), requireStaff(), requireOwner([...])
    validate             ตรวจ input ด้วย zod (ใช้ใน v2)
    response             response handler ของ v1 และ v2
  configs/db.config.js   connection pool (import { conn } จากที่นี่)
swagger/
  swagger.js             สร้าง swagger_output.json
  schemas/<module>.js    ตัวอย่าง body ที่ใช้ใน #swagger.requestBody
db/                      SQL สร้างตาราง / ข้อมูล
```

## เพิ่ม API ใหม่

1. เพิ่ม route ใน `<module>.routes.js` ใส่ `authentication` และถ้าแก้/ลบข้อมูลของคนอื่นได้ ให้ใส่ `requireOwner` หรือ `requireRole`
2. เขียน controller พร้อม comment `#swagger.tags`, `#swagger.summary` (ถ้ามี body ใช้ `#swagger.requestBody` อ้าง `$ref`)
3. ถ้ามี schema ใหม่ ให้เพิ่มใน `swagger/schemas/<module>.js`
4. `npm run dev` แล้วเปิด `/docs` จะเห็นเส้นใหม่ทันที

เส้นที่ไม่ต้องใช้ token ให้ใส่ `#swagger.security = []` ใน controller
