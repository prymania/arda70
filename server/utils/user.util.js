import { conn } from "../configs/db.config.js";



/**
 * @param {user_result} JSON user_detail to get rid of password, salt and correct user_role
 */
export function manage_user_detail_format(user_result) {

    const user_role_array = user_result.user_role.split(',').map(Number);
    delete user_result.password;
    delete user_result.salt;
    delete user_result.user_role;
    
    user_result.user_role = user_role_array;

    return user_result;
}

/**
 * @param {search_username} String search_username (other username)
 * @param {username} String username (self username from JWT)
 */
export function get_search_value(search_username, username) {

    return (search_username === undefined) ? username : search_username;

}

/**
 * @param {search_username} String search_username (other username)
 * @param {username} String username (self username from JWT)
 */
export function get_search_column(data) {

  return (
    data.search_username !== undefined ? ['username', data.search_username] :
    data.search_name     !== undefined ? ['name',     data.search_name] :
    data.search_phone    !== undefined ? ['phone',    data.search_phone] :
    data.search_idcard   !== undefined ? ['idcard',   data.search_idcard] :
    data.search_user_role!== undefined ? ['user_role',   data.search_user_role] :
    data.search_address_code!== undefined ? ['address_code',   data.search_address_code] : 
    null);


    // if(data.search_username){
    //   return ['username', data.search_username];
    // }
    // else if(data.search_name){
    //   return ['name', data.search_name];
    // }
    // return null;

}



/**
 * @param {JSON} results array of results
 * @param {String} column_name  column name
 */
export function manage_role_array(results, column_name) {
  results.forEach(obj => {
    obj[column_name] = obj[column_name].split(',').map(Number);
  });
}