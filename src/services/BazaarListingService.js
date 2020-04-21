import { API_USER_URL, API_LISTING_URL} from "../constants"

export const createListing = (userId, listing) =>
    fetch(`${API_USER_URL}/${userId}/listings`, {
        method: 'POST',
        body: JSON.stringify(listing),
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findListingsForUserId = (userId) =>
    fetch(`${API_USER_URL}/${userId}/listings`)
        .then(response => response.json())

export const findListingById = async (listingId) => {
    const response = await fetch(`${API_LISTING_URL}/${listingId}`)
    return await response.json()
}

export const updateListing = (uid, listingId, listing) =>
    fetch(`${API_USER_URL}/${uid}/listings/${listingId}`, {
        method: 'PUT',
        body: JSON.stringify(listing),
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteListing = async (uid, listingId) => {
    const response = await fetch(`${API_USER_URL}/${uid}/listings/${listingId}`, {
        method: 'DELETE',
        credentials: "include",
    })
    return await response.json()
}

export default {createListing, findListingById, findListingsForUserId, updateListing, deleteListing}