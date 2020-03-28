import React from "react"
import CraigslistComponent from "../CraigslistAPI/CraigslistComponent"
import LoginComponent from "../components/login/LoginComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import RegisterComponent from "../components/register/RegisterComponent"
import PrivacyPolicyComponent from "../components/privacypolicy/PrivacyPolicyComponent";
import ProfileComponent from "../components/profile/ProfileComponent";


export default class BazaarContainer extends React.Component {

    render () {
        return (
            <Router>
                <Route
                    path={`/`}
                    exact={true}
                    component={CraigslistComponent}/>

                <Route
                    path={`/search/:city/:searchPost`}
                    exact={true}
                    component={CraigslistComponent}/>

                <Route
                    path={`/posts/:city/:listingID`}
                    exact={true}
                    component={CraigslistComponent}/>

                <Route
                    path={`/login`}
                    exact={true}
                    component={LoginComponent}/>

                <Route
                    path={`/register`}
                    exact={true}
                    component={RegisterComponent}/>

                <Route
                    path={`/privacypolicy`}
                    exact={true}
                    component={PrivacyPolicyComponent}/>
          
                <Route
                    path={`/profile`}
                    exact={true}
                    component={ProfileComponent}/>
            </Router>

        )

    }

}