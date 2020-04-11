import React from "react"
import CraigslistComponent from "../CraigslistAPI/CraigslistComponent"
import LoginComponent from "../components/login/LoginComponent"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import RegisterComponent from "../components/register/RegisterComponent";
import HomeComponent from "../components/home/HomeComponent";
import PrivacyPolicyComponent from "../components/privacypolicy/PrivacyPolicyComponent";
import ProfileComponent from "../components/profile/ProfileComponent";
import "../components/footer/FooterComponent"
import FooterComponent from "../components/footer/FooterComponent";

import {connect} from "react-redux";
import craigslistService from "../services/CraigslistService"
import {findLocationsAction} from "../actions/locationActions"

class BazaarContainer extends React.Component {

    componentDidMount() {
        this.props.findLocations();
    }

    render () {
        return (
            <div>
            <Router>
                <Route
                    path={`/`}
                    exact={true}
                    component={HomeComponent}/>

                <Route
                    path={`/search`}
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
                    render={(props) => 
                        <RegisterComponent
                        locations={this.props.locations}/>}
                    //component={RegisterComponent}/>
                />

                <Route
                    path={`/privacypolicy`}
                    exact={true}
                    component={PrivacyPolicyComponent}/>
          
                <Route
                    path={`/profile`}
                    exact={true}
                    component={ProfileComponent}/>
            </Router>

            <FooterComponent/>
            </div>
        )

    }
}

const stateToPropertyMapper = (state) => {
    return {
        locations: state.locations.locations
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findLocations: () => {
            let locations = craigslistService.getLocations()
            dispatch(findLocationsAction(locations))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(BazaarContainer)