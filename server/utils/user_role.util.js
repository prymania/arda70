import { ROLE_HEAD_CE } from "../constants/table.const.js";


/**
 * @param {roleid} int roleid of current user
 */
export function isAboveSubdistrictRole(user_role) {
    return user_role.some(role => role >= ROLE_HEAD_CE);
}



