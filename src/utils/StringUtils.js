export const normalizeCity = (cityString) => {
    return cityString.toLowerCase().replace(/\s/g, '')
}

export default {normalizeCity}