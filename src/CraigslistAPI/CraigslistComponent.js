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
                    <NavBarComponent
                        profile = {this.props.profile}
                        logout = {this.props.logout}
                    />

                    <Route
                        path={`/search`}
                        exact={true}
                        profile = {this.props.profile}
                        component={CraigslistSearchComponent}/>

                    <Route
                        path={`/search/:city/:searchPost`}
                        exact={true}
                        profile = {this.props.profile}
                        component={CraigslistSearchComponent}/>

                    <Route
                        path={`/posts/:city/:listingID`}
                        exact={true}
                        profile = {this.props.profile}
                        component={CraigslistPostDetailsComponent}/>

                </Router>
        </div>

        )
    }
}