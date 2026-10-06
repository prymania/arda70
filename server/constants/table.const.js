// import dotenv from "dotenv";
// dotenv.config();


export const DEFAULT_ADDRESS_CODE = '00000000';

export const MSQUARE_TO_RAI = 0.000625;
export const DISTRICT_ADDRESS_CODE_INDEX = 4;
export const SUBDISTRICT_ADDRESS_CODE_INDEX = 6;

export const ROLE_GENERAL                   = 1;  // ผู้ใช้งานทั่วไป
export const ROLE_FARMER                    = 2;  // เกษตกร
export const ROLE_HEAD_CE                   = 3;  // หัวหน้าวิสาหกิจชุมชุน หรือ ผู้นำชุมชน (ตอนแรกผู้นำชุมชนเป็น role4 แต่เปลี่ยนเป็น อบต (กย.67))
export const ROLE_SUBDISTRICT_OFFICIER      = 4;  // อบต. หรือ จนท ระดับตำบล
export const ROLE_DISTRICT_OFFICER          = 5;  // จนท. ระดับอำเภอ
export const ROLE_PROVINCE_OFFICER          = 6;  // จนท. ระดับจังหวัด
export const ROLE_SE                        = 7;  // วิสาหกิจชุมชน
export const ROLE_ADMIN                     = 9;   // admin

export const USERS_STATUS_DISABLE           = 0;    // ถ้า role >=3 (หัวหน้าชุมชนขึ้นไป) ต้องให้ admin approve ก่อนจึงจะ enable
export const USERS_STATUS_ENABLE            = 1;

export const STAR_FARMER_TRUE      = 1;
export const STAR_FARMER_FALSE     = 0;
export const USER_CONSENT_TRUE     = 1;
export const USER_CONSENT_FALSE    = 0;

export const ACTIVITY_ACTION_BUSINESS = 1;
export const ACTIVITY_ACTION_OTHERS   = 2;

export const ALERT_ANNOUNCEMENT_ID  = 1;


export const HYDROLOGY    = 1;
export const METEOROLOGY  = 2;
export const SATELLITE    = 3;
export const DISTRICT_STATION = 0;
export const LIMIT_FORECAST_RECORD = 10;

export const ZERO = 0
export const ONE = 1
export const ASC = 'asc'
export const DESC = 'desc'

