import {API_USER_URL, API_BASE_URL} from "../constants";
import {checkParamsMatch, checkForEmptyFields, checkEmailFormat} from "../utils/FormUtils"
import {normalizeCity} from "../utils/StringUtils"


// Base Services
export const createUser = (user) =>
    fetch(`${API_USER_URL}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
        .then(response => response.json())

export const findUserById = (uid) =>
    fetch(`${API_USER_URL}/${uid}`)
        .then(response => response.json())
        .catch(e => {
            // Handle 204 Error: Content not found, return empty JSON
            return {};
        });

export const findUserByEmail = (email) =>
    fetch(`${API_USER_URL}/email/${email}`)
        .then(response => response.json())
        .catch(
            err => {
                // Handle 204 Error: Content not found, return empty JSON
                return {};
            })

export const findUserByUsername = (username) =>
    fetch(`${API_USER_URL}/username/${username}`)
        .then(response => response.json())
        .catch(
            err => {
                // Handle 204 Error: Content not found, return empty JSON
                return {};
            })

export const findAllUsers = async () => {
    const response = await fetch(`${API_USER_URL}`)
    return await response.json()
}

export const updateUser = (uid, user) =>
    fetch(`${API_USER_URL}/${uid}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteUser = (uid) =>
    fetch(`${API_USER_URL}/${uid}`, {
        method: "DELETE"
    })
        .then(response => response.json());

// Session Services
export const login = (user) =>
    fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const logout = () =>
    fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch(`${API_BASE_URL}/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

// Registration Services

const registrationChecks = async (user) => {
    // Returns a JSON object with a type ('SUCCESS' or 'ERROR')
    // If type == 'ERROR', will also an error message ('errorMessages')
    let returnJson = {
        'type' : 'ERROR',
        'errorMessages' : []
    }
    const emailCheck = await findUserByEmail(user.email);
    const usernameCheck = await findUserByUsername(user.username)

    // Check to see password and confirm password match
    if (!checkParamsMatch(user.password, user.confirmPassword)) {
        returnJson['errorMessages'].push('Passwords do not match.')
    }

    // Check to see that all fields are completed
    if (!checkForEmptyFields(user)) {
        returnJson['errorMessages'].push('All fields of the form must be filled out.')
    }

    //Check to see if valid email format
    if (!checkEmailFormat(user.email)) {
        returnJson['errorMessages'].push('Invalid email format.')
    }

    // Check if email exists already
    if (Object.keys(emailCheck).length !== 0) {
        returnJson['errorMessages'].push('The email you have entered is already being used.')
    }

    // Check if username exists already
    if (Object.keys(usernameCheck).length !== 0) {
        returnJson['errorMessages'].push('The username you have entered is already being used.')
    }

    // If no errorMessages have been accumulated return SUCCESS
    if (returnJson['errorMessages'].length === 0){
        return {'type' : 'SUCCESS'}
    }
    else {
        // Otherwise return ERROR, with all the errorMessages.
        return returnJson
    }
}

const cleanFormData = (user) => {
    // Remove confirmPassword Field
    delete user['confirmPassword'];
    // Normalize city field
    user['city'] = normalizeCity(user.city);

    return user

}

export const registerUser = async (user) => {
    let checks = await registrationChecks(user)

    if (checks.type === 'SUCCESS') {
        let cleanedUser = cleanFormData(user);
        try {
            createUser(cleanedUser);
            console.log("Successful Registration")
            checks['newUsername'] = user.username;
            return checks;
        }
        catch(e) {
            // Server Side Registration Error
            console.log("Server Side Registration Error")
            return {
                'type': 'ERROR',
                'errorMessages': e
            }
        }
    }
    else {
        // Client Side Registration Error
        console.log("Client Side Registration Error")
        return checks
    }
}

// Profile Update Services
const updateChecks = async (user) => {
    // Returns a JSON object with a type ('SUCCESS' or 'ERROR')
    // If type == 'ERROR', will also an error message ('errorMessages')
    let returnJson = {
        'type' : 'ERROR',
        'errorMessages' : []
    }
    const emailCheck = await findUserByEmail(user.email);
    const usernameCheck = await findUserByUsername(user.username);

    // Check to see password and confirm password match
    if (!checkParamsMatch(user.password, user.confirmPassword)) {
        returnJson['errorMessages'].push('Must confirm password correctly to save changes.')
    }

    // TODO: Pending decision on DOB field. The check below is commented out as all user DOB fields are currently null.
    // Check to see that no fields are empty (Updating user profile is a save-all type of function)
    /*if (!checkForEmptyFields(user)) {
        returnJson['errorMessages'].push('All fields of the form must be filled out.')
        console.log('checkForEmptyFields failed')
    }*/

    // Check to confirm valid email format
    if (!checkEmailFormat(user.email)) {
        returnJson['errorMessages'].push('Invalid email format.')
    }

    // Check if email belongs to different user
    if (Object.keys(emailCheck).length !== 0 && emailCheck.id !== user.id) {
        returnJson['errorMessages'].push('The email you have entered is already being used.')
    }

    // Check if username belongs to different user
    if (Object.keys(usernameCheck).length !== 0 && usernameCheck.id !== user.id) {
        returnJson['errorMessages'].push('The username you have entered is already being used.')
    }

    // If no errorMessages have been accumulated return SUCCESS
    if (returnJson['errorMessages'].length === 0){
        return {'type' : 'SUCCESS'}
    }

    else {
        // Otherwise return ERROR, with all the errorMessages.
        return returnJson
    }
}

// Note: parameter (along with other respective fields) is denoted as 'profile' to imply updating of existing user
export const updateProfile = async (profile) => {
    let checks = await updateChecks(profile);

    if (checks.type === 'SUCCESS') {
        let cleanedProfile = cleanFormData(profile);
        try {
            // await updateUser(profile.id, profile);
            await updateUser(cleanedProfile.id, cleanedProfile);
            console.log("Successful Update");
            return checks;
        }
        catch(e) {
            // Server Side Registration Error
            console.log("Update Profile: Server Side Registration Error")
            return {
                'type': 'ERROR',
                'errorMessages': e
            }
        }
    }
    else {
        // Client Side Registration Error
        console.log("Update Profile: Client Side Registration Error")
        return checks
    }
}



export default {createUser, findUserById, findAllUsers, updateUser, deleteUser, registerUser, updateProfile}