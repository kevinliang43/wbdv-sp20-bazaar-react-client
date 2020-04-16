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
import {logout, profile} from "../services/UserService"
import CreateListingComponent from "../components/createListing/CreateListingComponent";

class BazaarContainer extends React.Component {

    state = {
        profile: {}
    }

    componentDidMount() {
        this.props.findLocations();
        this.retrieveSession();
    }

    logout = () =>
        logout()
            .then(e => this.setState({
                profile: {}
            }))

    retrieveSession = () =>
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .catch(e => this.setState({
                profile: {}
            }))

    render () {
        return (
            <div>
            <Router>
                <Route
                    path={`/`}
                    exact={true}
                    render={(props) =>
                        <HomeComponent
                        {...props}
                        logout={this.logout}
                        profile={this.state.profile}/>}/>

                <Route
                    path={`/search`}
                    exact={true}
                    render={(props) =>
                        <CraigslistComponent
                        {...props}
                        logout={this.logout}
                        profile={this.state.profile}/>}/>

                <Route
                    path={`/search/:city/:searchPost`}
                    exact={true}
                    render={(props) =>
                        <CraigslistComponent
                        {...props}
                        logout={this.logout}
                        profile={this.state.profile}/>}/>

                <Route
                    path={`/posts/:city/:listingID`}
                    exact={true}
                    render={(props) =>
                        <CraigslistComponent
                        {...props}
                        logout={this.logout}
                        profile={this.state.profile}/>}/>

                <Route
                    path={`/login`}
                    exact={true}
                    render={(props) =>
                        <LoginComponent
                        {...props}
                        retrieveSession={this.retrieveSession}
                        profile={this.state.profile}/>}/>


                <Route
                    path={`/register`}
                    exact={true}
                    render={(props) =>
                        <RegisterComponent
                        locations={this.props.locations}/>}
                />

                <Route
                    path={`/privacypolicy`}
                    exact={true}
                    component={PrivacyPolicyComponent}/>
          
                <Route
                    path={`/profile`}
                    exact={true}
                    render={(props) =>
                        <ProfileComponent
                        {...props}
                        logout={this.logout}
                        profile={this.state.profile}/>}/>
                <Route
                    path={`/createlisting`}
                    exact={true}
                    render={(props) =>
                        <CreateListingComponent
                        {...props}
                        locations={this.props.locations}
                        logout={this.logout}
                        profile={this.state.profile}/>}/>
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