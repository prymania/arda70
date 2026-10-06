// ตัวช่วยดึงค่าจาก request  ใช้คู่กับ requireOwner ใน routes
//   requireOwner(["plang", query("plang_id")])
export const query  = (name) => (req) => req.query?.[name];
export const body   = (name) => (req) => req.body?.[name];
export const params = (name) => (req) => req.params?.[name];
