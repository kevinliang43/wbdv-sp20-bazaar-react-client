# Bazaar React Client (Spring 2020 WebDev CS4550 Project)
Bazaar, a buying/selling platform

# Project Description

Click [here](https://docs.google.com/document/d/15P-kD-6Xecy23185pkeDW9y2AOa3eSNOLCfQKAuWYYo/edit?usp=sharing) to learn more about the Bazaar Platform

# PROTOTYPE

The API we used was the Craigslist API but we added modifications to it so that it would behave in the way we want it to. 

The search criteria is divided up by two search bars: one to search for the type of product and one to search for the location
for this product. 

Upon typing valid inputs into these two search criteria, the summary page will be displayed showing all of the products that include what the user typed in and are in the area that the user typed in. The summary page can be toggled between two views - grid view and card view. The information shown for each individual product is a concatenated version of the title of the product, the price of the product, and the first picture in the gallery of the product. If the product does not have any pictures then there will be no immage shown on the summary page for that individual product. 

Clicking on a product will direct the user to that product's details page. The details page shows the product's full title, its price,
a description of the product, and every image in its gallery. 

An example query is if I type "Nintendo Switch" in the listing search bar and "New York" in the location search bar, I will be directed to a summary page that is a list of Nintendo Switch products in New York based off of the information gathered with the
Craigslist API. If I were to click on one product, I would see what the seller titled the product, the price the seller gave it, any pictures that the seller uploaded of the product, and a description created by the seller.


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
