import cheerio from 'cheerio'
import {proxyUrl} from '../constants'
export const searchListings =(location, searchQuery, limit) =>
    fetch(proxyUrl + `https://${location}.craigslist.org/search/sss?sort=rel&query=${searchQuery}`)
        .then(response => response.text())
        .then(resultHTML => parseListings(resultHTML, limit))

const parseListings = (pageHTML, limit) => {
    let $ = cheerio.load(pageHTML);
    let listings = []
    console.log(pageHTML);

    $('div.content')
        .find('.result-row')
        .each((idx, row) => {
            let listing = {
                title : ($(row).find('.result-title').text() || '').trim(),
                pid : ($(row).attr('data-pid') || '').trim(),
                price : ($(row).find('.result-meta .result-price').text() || '').replace(/^\&\#x0024\;/g, '').trim(), 
                date : ($(row).find('time').attr('datetime') || '').trim(),
                listingUrl : ($(row).find('.result-title').attr('href'))
            };
            listings = [...listings, listing]
            if (listings.length >= limit) {
                return false;
            }
        })
    console.log(listings);
    return listings;
}
        


export default {searchListings}
