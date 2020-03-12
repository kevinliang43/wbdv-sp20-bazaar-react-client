import React from "react"
import CraigslistSearchComponent from "./CraigslistSearchComponent"
import CraigslistPostDetailsComponent from "./CraigslistPostDetailsComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class CraigslistComponent extends React.Component {

    render() {
        return (
            <Router>
            <div className={`container`}>
                <h1>Craigslist Client</h1>

                <Route
                    path={`/`}
                    exact={true}
                    component={CraigslistSearchComponent}/>

                <Route
                    path={`/search/:city/:searchPost`}
                    exact={true}
                    component={CraigslistSearchComponent}/>

                <Route
                    path={`/posts/:city/:listingID`}
                    exact={true}
                    component={CraigslistPostDetailsComponent}/>

            </div>
        </Router>
        )
    }
}