// schema ของ plang, subplang, activity, disaster  (ตรงกับ server/api_v2/<module>/<module>.schema.js)

export const examples = {
  PlangInput: {
    plang_name: "แปลงนาบ้านดอน",
    plang_address_code: "44050401",
    lat_long: "[[16.24,103.25],[16.25,103.26],[16.23,103.27]]",
    center: "16.24,103.25",
    rai: 3,
    ngan: 1,
    wa: 20,
    moo: "5",
    village: "บ้านดอน",
    road: "",
    subdistrict: "ขามเรียง",
    district: "กันทรวิชัย",
    province: "มหาสารคาม",
    title_deed: "โฉนด",
    own_type: "เจ้าของ",
    detail: "",
  },
  WaterSupplyInput: {
    supply_type: "บ่อจิ๋ว",
    width: 4,
    depth: 3,
    water_depth: 2,
    detail: "",
  },
  WaterSourceInput: {
    source_type: "หนอง",
    source_name: "หนองบัว",
    width: 50,
    depth: 3,
    water_depth: 2,
    detail: "",
  },
  SoilMeterInput: {
    soil: 30, t: 28.5, ph: 6.5, ec: 120, n: 10, p: 5, k: 8,
    detail: "",
  },

  SubplangInsertInput: {
    $plang_id: 12,
    lat_long: "[[16.24,103.25],[16.25,103.26],[16.23,103.27]]",
    center: "16.24,103.25",
    rai: 1, ngan: 0, wa: 50,
    detail: "",
  },
  SubplangUpdateInput: {
    lat_long: "[[16.24,103.25],[16.25,103.26],[16.23,103.27]]",
    center: "16.24,103.25",
    rai: 1, ngan: 0, wa: 50,
    detail: "",
  },

  ActivityInsertInput: {
    $plang_id: 12,
    subplang_id: null,
    type1: "ประมงน้ำจืด", type2: "ปลา", type3: "ปลาทับทิม",
    pattern: 4, unit: "ตัว",
    rai: 0, ngan: 0, wa: 0,
    amount: 2000, pond: 2, amount_per_pond: 1000,
    start_date: "2025-06-01", end_date: "2025-10-01",
    detail: "",
  },
  ActivityUpdateInput: {
    type1: "ประมงน้ำจืด", type2: "ปลา", type3: "ปลาทับทิม",
    pattern: 4, unit: "ตัว",
    rai: 0, ngan: 0, wa: 0,
    amount: 2000, pond: 2, amount_per_pond: 1000,
    start_date: "2025-06-01", end_date: "2025-10-01",
    detail: "",
  },

  DisasterInsertInput: {
    $plang_id: 12,
    category: "ภัยแล้ง", type: "", affect: "ข้าวเสียหาย",
    start_date: "2025-03-01", end_date: "2025-04-15",
    size: 2, unit: "ไร่",
    detail: "",
  },
  DisasterUpdateInput: {
    category: "ภัยแล้ง", type: "", affect: "ข้าวเสียหาย",
    start_date: "2025-03-01", end_date: "2025-04-15",
    size: 2, unit: "ไร่",
    detail: "",
  },
};

export const schemas = {};
