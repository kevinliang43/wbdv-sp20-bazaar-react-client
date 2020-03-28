import React from "react"
import NavBarComponent from "../components/NavBarComponent"
import CraigslistSearchComponent from "./CraigslistSearchComponent"
import CraigslistPostDetailsComponent from "./CraigslistPostDetailsComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class CraigslistComponent extends React.Component {

    render() {
        return (
            <div className={`container-fluid`}>
                <Router>
                    <NavBarComponent/>

                    <Route
                        path={`/search`}
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

                </Router>
        </div>

        )
    }
}