import {CREATE_LISTING, FIND_LISTING_FOR_USER, UPDATE_LISTING, DELETE_LISTING} from "../actions/listingActions"

const initialState = {
    listings: []
}


const listingReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_LISTING:
            return {
                listings: [
                    ...state.listings,
                    action.newListing
                ]
            }
        case FIND_LISTING_FOR_USER:
            return {
                listings: action.listings
            }
        case UPDATE_LISTING:
            return {
                listings: state.listings
            }
        case DELETE_LISTING:
            return {
                listings: state.listings.filter(listing => listing.id !== action.listingId)
            }
        default:
            return state
    }
}

export default listingReducer