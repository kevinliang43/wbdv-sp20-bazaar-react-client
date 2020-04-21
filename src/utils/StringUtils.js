export const normalizeCity = (cityString) => {
    return cityString.toLowerCase().replace(/\s/g, '')
}

export const parseDate = (isoDateString) => {
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    let dateObj = (new Date(isoDateString))
    return dateObj.toLocaleDateString(undefined, options)
}

export const parseCraigslistSubregionURLPrefix = (craigslistURL) => {
    // Extract the URLSubregionPrefix from Craigslist URLs that come in the form of : 
    // http://<subregion>.craigslist.org/ or https://<subregion>.craigslist.org/

    // Replace http/https URL prefix
    let urlNoHTTPPrefix = craigslistURL.replace('https://', '').replace('http://', '');
    // Split on '.', and take the first element
    let finalURLPrefix = urlNoHTTPPrefix.split('.')[0];
    return finalURLPrefix;
}

export const capitalizeAllFirstLetter = (string) => {
    if (!string) {
        return '';
    }
    let stringArray = string.split(" ");
    let capitalizedStringArray = stringArray.map(stringSlice => stringSlice.charAt(0).toUpperCase() + stringSlice.slice(1));
    return capitalizedStringArray.join(" ")
  }

export default {normalizeCity}
