import React from "react";
import "./HomeComponent.css"
import NavBarComponent from "../NavBarComponent"
import {defaultCity} from "../../constants"
import {getRecentListings} from "../../services/CraigslistService"
import {normalizeCity} from "../../utils/StringUtils"
import ListingRowComponent from "../ListingRowComponent";
import HeadLineComponent from "./headline/HeadLineComponent"



export default class HomeComponent extends React.Component {

    state = {
        listings : [],
        searchQuery: '',
        city: 'boston', //TODO: Replace with user's city when we implement users state
        view: 'LIST',
        loggedIn: false
    }

    componentDidMount() {
        this.getRecentListings(this.state.city)
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

                    {!this.state.loggedIn && // Anonymous View TODO: Put this into redux state handler

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

                </div>
            </div>
        )
    }
}