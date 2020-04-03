import {API_USER_URL} from "../constants";
import {checkParamsMatch, checkForEmptyFields, checkEmailFormat} from "../utils/FormUtils"
import {normalizeCity} from "../utils/StringUtils"


// Base Services
export const createUser = (user) =>
    fetch(`${API_USER_URL}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findUserById = (uid) =>
    fetch(`${API_USER_URL}/${uid}`)
        .then(response => response.json())

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
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteUser = async (uid) => {
    const response = await fetch(`${API_USER_URL}/${uid}`, {
        method: 'DELETE'
    })
    return await response.json()
}

// Registration Services

const registrationChecks = async (user) => {
    // Returns a JSON object with a type ('SUCCESS' or 'ERROR')
    // If type == 'ERROR', will also an error message ('errorMessage')
    let returnJson = {
        'type' : 'ERROR'
    }
    const emailCheck = await findUserByEmail(user.email);
    const usernameCheck = await findUserByUsername(user.username)

    // Check to see password and confirm password match
    if (!checkParamsMatch(user.password, user.confirmPassword)) {
        returnJson['errorMessage'] = 'Passwords do not match.'
    }

    // Check to see that all fields are completed
    else if (!checkForEmptyFields(user)) {
        returnJson['errorMessage'] = 'All fields of the form must be filled out.'
    }

    //TODO: Check to see valid email <something@something.com>
    else if (!checkEmailFormat(user.email)) {
        returnJson['errorMessage'] = 'Invalid Email.'
    }

    // Check if email exists already
    else if (Object.keys(emailCheck).length !== 0) {
        returnJson['errorMessage'] = 'The Email you have entered is already being used.'
    }

    // Check if username exists already
    else if (Object.keys(usernameCheck).length !== 0) {
        returnJson['errorMessage'] = 'The Username you have entered is already being used.'
    }

    else {
        returnJson['type'] = 'SUCCESS'
    }

    return returnJson

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
            // createUser(cleanedUser);
            console.log("Successful Registration")
            checks['newUsername'] = user.username;
            return checks;
        }
        catch(e) {
            // Server Side Registration Error
            console.log("Server Side Registration Error")
            return {
                'type': 'ERROR',
                'errorMessage': e
            }
        }
    }
    else {
        // Client Side Registration Error
        console.log("Client Side Registration Error")
        return checks
    }

}

export default {createUser, findUserById, findAllUsers, updateUser, deleteUser, registerUser}