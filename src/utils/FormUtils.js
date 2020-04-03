export const checkParamsMatch = (param1, param2) => {
    return param1 === param2;
}

export const checkForEmptyFields = (form) => {
    let keys = Object.keys(form);

    for(var i=0; i<keys.length; i++){
        if(!form[keys[i]]) {
            return false;
        }
    }

    return true;

}

export default {checkParamsMatch, checkForEmptyFields}
