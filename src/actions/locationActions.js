export const FIND_LOCATION = "FIND_LOCATION"

export const findLocationsAction = (locations) => ({
    type: FIND_LOCATION,
    newLocations: locations
})