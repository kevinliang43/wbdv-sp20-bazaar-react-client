export const CREATE_LISTING = "CREATE_LISTING"
export const FIND_LISTING_FOR_USER = "FIND_LISTING_FOR_USER"
export const UPDATE_LISTING = "UPDATE_LISTING"
export const DELETE_LISTING = "DELETE_LISTING"

export const createListingAction = (listing) => ({
    type: CREATE_LISTING,
    newListing: listing
})


export const findListingForUser = (listings) => ({
    type: FIND_LISTING_FOR_USER,
    listings: listings
})

export const updateListingAction = (listing) => ({
    type: UPDATE_LISTING,
    updatedListing: listing
    
})

export const deleteListingAction = (listingId) => ({
    type: DELETE_LISTING,
    listingId: listingId
})