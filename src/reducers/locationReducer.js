import {FIND_LOCATION} from "../actions/locationActions"

const initialState = {
    locations: {}
}

const locationReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_LOCATION:
            return {
                locations: action.newLocations
            }
        default:
            return state
    }
}

export default locationReducer