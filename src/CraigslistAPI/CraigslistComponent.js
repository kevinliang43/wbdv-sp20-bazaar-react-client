import React from "react"
import CraigslistSearchComponent from "./CraigslistSearchComponent"
import CraigslistPostDetailsComponent from "./CraigslistPostDetailsComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Client} from "node-craigslist"

export default class CraigslistComponent extends React.Component {

    craigslistClient = new Client({city : 'boston'})

    render() {
        return (
            <Router>
            <div className={`container`}>
                <h1>Craigslist Client</h1>

                <Route
                    path={`/`}
                    exact={true}
                    craigslistClient={this.craigslistClient}
                    component={CraigslistSearchComponent}/>

                <Route
                    path={`/search/:searchPost`}
                    exact={true}
                    craigslistClient={this.craigslistClient}
                    component={CraigslistSearchComponent}/>

                <Route
                    path={`/posts/:postID`}
                    exact={true}
                    component={CraigslistPostDetailsComponent}/>

            </div>
        </Router>
        )
    }
}