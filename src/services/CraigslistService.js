import cheerio from 'cheerio'
import {proxyUrl} from '../constants'

export const searchListings =(location, searchQuery, limit) =>
    fetch(proxyUrl + `https://${location}.craigslist.org/search/sss?sort=rel&query=${searchQuery}`)
        .then(response => response.text())
        .then(resultHTML => parseListings(resultHTML, limit))

export const getListingDetails = (listingUrl) =>
    fetch(proxyUrl + listingUrl)
        .then(response => response.text())
        .then(resultHTML => parseListingDetails(resultHTML))

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
        description: ($('#postingbody').text() || '').trim()
    }
    return details
}
        


export default {searchListings}

