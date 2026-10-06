// schema กลาง ใช้ได้ทุก module
// เขียนแบบ "ตัวอย่างค่า" (swagger-autogen จะแปลงเป็น schema ให้)  ใส่ $ หน้าชื่อ = required

export const examples = {
  ApiResponse: {
    code: 200,
    result: {},
  },
  ApiError: {
    code: 400,
    result: null,
    error: "ข้อความแสดงข้อผิดพลาด",
  },
  ValidationError: {
    code: 400,
    result: ["body.rai: ต้องเป็นตัวเลข"],
    error: "ข้อมูลไม่ถูกต้อง",
  },

  // ---- auth / user (ของเดิมใน swagger.js) ----
  User: {
    $name: "tawan",
    $username: "string",
    $password: "string",
  },
  UserDetail: {
    name: "ปีเตอร์",
    surname: "ปาร์คเกอร์",
    idcard: "2201200440445",
    gender: "M",
    birthday: "24-09-2000",
    houseid: "12/100",
    moo: "10",
    village: "บ้านอยู่ดี",
    road: "สาธร",
    subdistrict: "ขามเรียง",
    district: "กันทรวิชัย",
    province: "มหาสารคาม",
    post: "44150",
    phone: "0994454545",
    info: "ข้อมูลเพิ่มเติมเกียวกับปีเตอร์",
  },
  GeneralError: {
    code: 400,
    result: "string",
    error: "string",
  },
};

// schema แบบ OpenAPI ตรง ๆ (ใช้เมื่อเขียนเป็นตัวอย่างไม่ได้ เช่น ไฟล์ upload)
export const schemas = {
  FileUpload: {
    type: "object",
    required: ["file"],
    properties: {
      file: { type: "string", format: "binary", description: "ไฟล์รูปภาพ" },
    },
  },
  PictureUpload: {
    type: "object",
    required: ["file"],
    properties: {
      file:   { type: "string", format: "binary", description: "ไฟล์รูปภาพ" },
      detail: { type: "string", description: "คำอธิบายรูป (ไม่บังคับ)" },
    },
  },
};
