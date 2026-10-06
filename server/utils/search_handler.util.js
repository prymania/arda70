import { ASC, DESC, ONE } from "../constants/table.const.js";



/**
 * @param {roleid} int roleid of current user
 */
export function sort_direction_handler(sort_direction) {
    return (sort_direction==ONE)? DESC: ASC;
}
