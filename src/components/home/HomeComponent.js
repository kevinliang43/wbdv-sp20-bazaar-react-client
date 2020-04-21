import React from "react";
import "./HomeComponent.css"
import NavBarComponent from "../NavBarComponent"
import {defaultCity} from "../../constants"
import {getRecentListings} from "../../services/CraigslistService"
import {normalizeCity} from "../../utils/StringUtils"
import ListingRowComponent from "../ListingRowComponent";
import HeadLineComponent from "./headline/HeadLineComponent"
import { capitalizeAllFirstLetter } from "../../utils/StringUtils"




export default class HomeComponent extends React.Component {

    state = {
        listings : [],
        searchQuery: '',
        city: 'boston', //TODO: Replace with user's city when we implement users state
        view: 'LIST',
    }

    componentDidMount() {
        if (Object.keys(this.props.profile).length !== 0) {
            this.getRecentListings(this.props.profile.city)
        }
        else {
            this.getRecentListings(defaultCity)

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.profile !== this.props.profile) { //If BazaarContainer retrieves updated profile (example: after make update request)
            if (Object.keys(this.props.profile).length !== 0) {
                this.getRecentListings(this.props.profile.city)
            }
            else {
                this.getRecentListings(defaultCity)

            }
        }
    } 

    getRecentListings = (searchCity) => {
        if (!searchCity.replace(/\s/g, '')) {
            searchCity = defaultCity;
        }
        searchCity = normalizeCity(searchCity);
        getRecentListings(searchCity, 5)
            .then(results => this.setState({
                listings : results
            }))
    }

    urlToRegionMapping = require("../../services/serviceResources/urlToRegionMapping.json");

    render() {
        return (
            <div className={`container-fluid`}>
                <NavBarComponent
                    profile = {this.props.profile}
                    logout = {this.props.logout}
                />
                
                <h1 className="display-2 text-center mt-4">Bazaar</h1>

                <div class="row justify-content-center">

                    <div className="col-11">
                        <HeadLineComponent/>
                    </div>

                    {Object.keys(this.props.profile).length === 0 &&

                        <div className="col-10">
                            <h1 className="display-2 text-center mb-5">Recent Listings</h1>
                                <ul className={`list-group mt-2`}>
                                    {this.state.listings.map((listing, idx) =>
                                        <ListingRowComponent
                                            idx={idx}
                                            listing={listing}
                                            city={this.state.city}
                                            type="craigslist"
                                            />
                                    )}
                                </ul>
                        </div>
                    }

                    {Object.keys(this.props.profile).length !== 0 &&

                            <div className="col-10">
                            <h1 className="display-2 text-center mb-5">Recent Listings in {capitalizeAllFirstLetter(this.urlToRegionMapping[this.props.profile.city])} </h1>
                                <ul className={`list-group mt-2`}>
                                    {this.state.listings.map((listing, idx) =>
                                        <ListingRowComponent
                                            idx={idx}
                                            listing={listing}
                                            city={this.state.city}
                                            type="craigslist"
                                            />
                                    )}
                                </ul>
                            </div>
                    }

                </div>
            </div>
        )
    }
}