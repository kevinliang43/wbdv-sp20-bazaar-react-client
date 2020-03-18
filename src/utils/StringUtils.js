export const normalizeCity = (cityString) => {
    return cityString.toLowerCase().replace(/\s/g, '')
}

export const parseDate = (isoDateString) => {
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    let dateObj = (new Date(isoDateString))
    return dateObj.toLocaleDateString(undefined, options)
}

export default {normalizeCity}