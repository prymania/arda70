
/**
 * @param {Array} array array of number-string
 */
export function sumStringArray(array) {
    let result = array
                    .map( function(elt){ // assure the value can be converted into an integer
                    return /^\d+$/.test(elt) ? parseInt(elt) : 0; 
                    })
                    .reduce( function(a,b){ // sum all resulting numbers
                    return a+b
                    });
    return result;
}

/**
 * @param {Array} array array of number-string
 */
export function parseStringArray(array) {
    const result = array.map(Number)
    return result;
}