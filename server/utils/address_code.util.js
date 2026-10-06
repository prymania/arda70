import { conn } from "../configs/db.config.js";
import { DISTRICT_ADDRESS_CODE_INDEX, SUBDISTRICT_ADDRESS_CODE_INDEX } from "../constants/table.const.js";


/**
 * @param {roleid} int roleid of current user
 */
export async function get_user_address_code(username) {
    
    const address_code_query = 
        `select address_code from USERS where username = ?`;

    const [results, fields] = await conn.query(address_code_query, [username]);
    
    const address_code = results[0].address_code;

    return address_code;
}

/**
 * @param {roleid} int roleid of current user
 */
export function get_district_address_code(address_code) {
    return address_code.substring(0, DISTRICT_ADDRESS_CODE_INDEX);
}
/**
 * @param {roleid} int roleid of current user
 */
export function get_subdistrict_address_code(address_code) {
    return address_code.substring(0, SUBDISTRICT_ADDRESS_CODE_INDEX);
}

