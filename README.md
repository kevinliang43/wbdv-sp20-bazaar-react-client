# Bazaar React Client (Spring 2020 WebDev CS4550 Project)
Bazaar, a buying/selling platform

# Project Description

Click [here](https://docs.google.com/document/d/15P-kD-6Xecy23185pkeDW9y2AOa3eSNOLCfQKAuWYYo/edit?usp=sharing) to learn more about the Bazaar Platform

# PROTOTYPE

## Craigstlist API

The original API that we intended to use was the [node-craigslist API](https://github.com/Rob--W/cors-anywhere). However, we ran into a CORS policy issue that seems to related to the way the API is fetching DOMs from the Craigslist site. Upon discussing with Jose about this, we've agreed upon a solution, that is documented in this [Piazza Post](https://piazza.com/class/k4ynwwy8imo2hw?cid=908).

In summary, we will be using the way they are parsing the retrieved DOMs into JSON, and simply fixing the fetches to Craigslist in our own `services` module.

## Search

Search for listings can be done either on the main Search page, or in the site-wide Navbar. Two criterias must be met when performing a search:
1. The Listing input field (which defines what product/service is being searched for) must be filled in.
2. The City input field (Filters searches to a particular city) must be filled in.

## Search Results

Upon filling in valid inputs to these two search criteria and clicking the 'SEARCH' button, search results will be returned in either a 'LIST' view or a 'GRID' view. The view can be toggled with the LIST/GRID toggle button on the top right corner of the page, below the Navbar.

In the search results page, each listing will contain high level information that includes the `Title` of the listing, `Price` of the listing, and a single `Image` that is associated with the listing. If no `Image` is associated with the listing, then `No Images Available` will be displayed in the row/card for that particular listing in the Search Results page.

Search results have been limited to 20 listings for now (This will be modified later on to allow the user to determine how many results they want per page).

## Listing Details Page

Clicking on a product will direct the user to that listings's details page. The details page shows the product's `Title`, `Price`, a `Description`, and all `Image`s associated with the Craigslist listing.

## Example Query
1. Type "Nintendo Switch" into the listing search field.
2. Type "New York" into the city search field.
3. Press the SEARCH button.
4. Listings for "Nintendo Switch" products that are being sold by Users based in "New York" will be shown.
5. Click on one of the Titles of the search results. This will redirect you to the Listings Details page.
6. Listing Details page will show the Title, Price, Description and all Images associated with the Listing.
7. Click the 'Bazaar' label on the Navbar to be redirected to the main Listings Search page.


# React Bootstrap Info
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
