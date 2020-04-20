import React from 'react';
import BazaarContainer from "./containers/BazaarContainer"
import './App.css';

import {combineReducers, createStore} from "redux";
import locationReducer from "../src/reducers/locationReducer";
import listingReducer from "../src/reducers/listingReducer"
import {Provider} from "react-redux";



const rootReducer = combineReducers({
    locations: locationReducer,
    listings: listingReducer
})

const store = createStore(rootReducer)

const App = () => 
    <Provider store={store}>
        <BazaarContainer/>
    </Provider>

export default App;
