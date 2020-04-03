import {API_USER_URL} from "../constants";
import {checkParamsMatch, checkForEmptyFields} from "../utils/FormUtils"
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

// Custom Services

const registrationChecks = (user) => {
    // Returns a JSON object with a type ('SUCCESS' or 'ERROR')
    // If type == 'ERROR', will also an error message ('errorMessage')
    let returnJson = {
        'type' : 'FAIL'
    }

    // Check to see password and confirm password match
    if (!checkParamsMatch(user.password, user.confirmPassword)) {
        returnJson['errorMessage'] = 'Passwords do not match'
    }

    // Check to see that all fields are completed
    else if (!checkForEmptyFields(user)) {
        returnJson['errorMessage'] = 'All fields of the form must be filled out'
    }

    else {
        returnJson['type'] = 'SUCCESS'
    }

    return returnJson


        // Check to see valid email <something@something.com>
        // Check if email exists already
        // Check if username exists already
}

const cleanFormData = (user) => {
    // Remove confirmPassword Field
    delete user['confirmPassword'];
    // Normalize city field
    user['city'] = normalizeCity(user.city);

    return user

}

export const registerUser = (user) => {
    let checks = registrationChecks(user)

    if (checks.type === 'SUCCESS') {
        let cleanedUser = cleanFormData(user);
        //createUser(cleanedUser)
        console.log(cleanedUser);
    }
    else {
        console.log("Failed Checks")
        console.log(checks.errorMessage)
    }

}

export default {createUser, findUserById, findAllUsers, updateUser, deleteUser, registerUser}