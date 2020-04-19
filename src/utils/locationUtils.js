
export const generateRegionToUrlMapping = () => {
    let locations = require('../services/serviceResources/locationResource.json');
    let finalMapping = {}
    Object.keys(locations).map(continent => {
        Object.values(locations[continent]['regions']).map(subregions => {
            finalMapping = {
                ...finalMapping,
                ...subregions
            }
        })
    })
    // Sort keys alphabetically
    const orderedMapping = {};
    Object.keys(finalMapping).sort().forEach(function(key) {
        orderedMapping[key] = finalMapping[key];
    });
    return orderedMapping;
}

export const generateUrlToRegionMapping = () => {
    let regionToUrlMapping = require('../services/serviceResources/regionToUrlMapping.json');

    let urlToRegionMapping = {};
    Object.keys(regionToUrlMapping).map(region => {
        urlToRegionMapping[regionToUrlMapping[region]] = region;
    })

    return urlToRegionMapping;

}

