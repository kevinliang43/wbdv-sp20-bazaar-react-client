export const checkParamsMatch = (param1, param2) => {
    return param1 === param2;
}

export const checkForEmptyFields = (form) => {
    let keys = Object.keys(form);

    for(var i=0; i<keys.length; i++){
        if(!form[keys[i]]) {
            console.log('heres what wasnt filled out', keys[i])
            return false;
        }
    }

    return true;

}

export const checkEmailFormat = (email) => {
    // Credit: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default {checkParamsMatch, checkForEmptyFields}
