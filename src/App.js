import React from 'react';
import BazaarContainer from "./containers/BazaarContainer"
import './App.css';

import {combineReducers, createStore} from "redux";
import locationReducer from "../src/reducers/locationReducer";
import {Provider} from "react-redux";



const rootReducer = combineReducers({
    locations: locationReducer
})

const store = createStore(rootReducer)

const App = () => 
    <Provider store={store}>
        <BazaarContainer/>
    </Provider>

export default App;
