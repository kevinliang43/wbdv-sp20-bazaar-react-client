import cheerio from 'cheerio'
import {proxyUrl, CRAIGSLIST_LOCATIONS_URL} from '../constants'
import {parseCraigslistSubregionURLPrefix} from '../utils/StringUtils'

export const searchListings =(location, searchQuery, limit) =>
    fetch(proxyUrl + `https://${location}.craigslist.org/search/sss?sort=rel&query=${searchQuery}`)
        .then(response => response.text())
        .then(resultHTML => parseListings(resultHTML, limit))

export const getRecentListings =(location, limit) =>
    fetch(proxyUrl + `https://${location}.craigslist.org/search/sss`)
        .then(response => response.text())
        .then(resultHTML => parseListings(resultHTML, limit))

export const getListingDetails = (listingUrl) =>
    fetch(proxyUrl + listingUrl)
        .then(response => response.text())
        .then(resultHTML => parseListingDetails(resultHTML))


export const getLocations = () => {
    let locations = require('./serviceResources/locationResource.json');
    return locations;
}


/* Parsing Helper Functions */

const parseListings = (pageHTML, limit) => {
    // Credit for DOM Parsing to get JSON Elements: https://github.com/brozeph/node-craigslist
    let $ = cheerio.load(pageHTML);
    let listings = []
    $('div.content')
        .find('.result-row')
        .each((idx, row) => {
            let listing = {
                title : ($(row).find('.result-title').text() || '').trim(),
                source : 'craigslist',
                pid : ($(row).attr('data-pid') || '').trim(),
                price : ($(row).find('.result-meta .result-price').text() || '').replace(/^\&\#x0024\;/g, '').trim(), 
                date : ($(row).find('time').attr('datetime') || '').trim(),
                listingUrl : ($(row).find('.result-title').attr('href')),
                imagePaths : ($(row).find('.result-image').attr('data-ids') || '').trim().split(',')
                                .map(imPath => imPath.split(":")[1])
            };
            listings = [...listings, listing]
            if (listings.length >= limit) {
                return false;
            }
        })
    return listings;
}

const parseListingDetails = (pageHTML) => {
    // Credit for DOM Parsing to get JSON Elements: https://github.com/brozeph/node-craigslist
    let $ = cheerio.load(pageHTML);
    let details = {
        description: ($('#postingbody').text() || '').trim().replace('QR Code Link to This Post', '')
    }
    return details
}

const parseRegions = (pageHTML) => {
    let $ = cheerio.load(pageHTML);

    // Get the list of continents 
    let continents = [];
    $('article.page-container')
        .find('h1')
        .each((idx, row) => {
            let continent = {
                name: $(row).text(),
                countryCode: ($(row).find('a').attr('name'))
            }
            continents = [...continents, continent]
        })

    // Initialize our Final Mapping from continents-> region -> {subregionName : subregionURLPrefix}
    let finalRegionMapping = {}

    // Finish mapping of continents -> region -> subregion
    $('section.body')
        .find('.colmask')
        .each((idx, row) => {
            // Current continent
            let currentContinent = continents[idx]
            // Find the regions and initialize regions : subregions mapping
            let regions = []
            let regionsToSubregionsMapping = {}
            $(row).find('h4').map((index, element) => {
                regions.push($(element).text()); // Add to our list of regions (in order)
            })

            // Find the subregions for each region
            let subregions = $(row).find('ul').each((index, element) => {
                let region = regions[index]; // Current region

                // Map each subregion name to its corresponding URL prefix
                let subregionsMapping = {};
                $(element).find('li').each((liIdx, liElement) => {
                    let subregionName = $(liElement).text(); // Get name of subregion
                    let subregionURLPrefix = parseCraigslistSubregionURLPrefix($(liElement).find('a').attr('href')); // Get URL prefix of subregion
                    subregionsMapping[subregionName] = subregionURLPrefix; // Map subregion name to its URL prefix
                })

                // Map Each region to its subregions mapping
                regionsToSubregionsMapping[region] = subregionsMapping;
            })

            // Append entry to our final mapping
            finalRegionMapping[currentContinent['countryCode']] = {
                continentName: currentContinent['name'],
                'regions' : regionsToSubregionsMapping
            }
        })
    
    return finalRegionMapping;
}        

export default {searchListings, getRecentListings, getListingDetails, getLocations}