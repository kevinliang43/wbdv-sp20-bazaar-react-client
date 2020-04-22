import React from 'react';
import NavBarComponent from "../NavBarComponent";
import UserService from "../../services/UserService";
import ListingRowComponent from "../ListingRowComponent";
import {searchListings} from "../../services/CraigslistService";
import defaultProPic from "../../images/defaultProfilePic.jpg"
import {capitalizeAllFirstLetter, } from "../../utils/StringUtils";
import BazaarListingService from '../../services/BazaarListingService';

class PublicProfileComponent extends React.Component {
    state = {
        user: {},
        listings: []
    };

    componentDidMount() {
        UserService.findUserById(this.props.userId)
            .then(result => this.setState({user: result}));
        BazaarListingService.findListingsForUserId(this.props.userId)
            .then(results => this.setState({listings: results}));
    }

    urlToRegionMapping = require("../../services/serviceResources/urlToRegionMapping.json");
    getRegionNameFromUrl = (url) =>
        this.urlToRegionMapping[url]

    render() {
        return (
            <div className="container-fluid">
            <NavBarComponent profile={this.props.profile} logout={this.props.logout}/>

            {Object.keys(this.state.user).length === 0 &&
            <div class="row d-flex justify-content-center">
                <div className="col-sm-6 col-10 text-center">

                <h1 className="display-2">User Not Found</h1>
                <br></br>
                <a className="btn btn-block btn-success" href="/">Return Home</a>
                </div>
            </div>
            }


            {Object.keys(this.state.user).length > 0 &&
                <div className="row">
                    <div className="col-4 border border-success">
                        <div className="col pt-4">
                            <img className="justify-content-center img-fluid" id="profile-pic"
                                 src={this.state.user.imageUrl ? this.state.user.imageUrl : defaultProPic}
                                 height="200" width="200"/>
                            <h3 className="mt-2">{this.state.user.username}</h3>
                            <span>
                                <b>Operating Location: </b>
                                {capitalizeAllFirstLetter(this.state.user.city ? this.getRegionNameFromUrl(this.state.user.city) : '')}
                            </span>
                        </div>
                    </div>
                    <div className="col border border-success pt-3">
                        <div>
                            <h2 className="py-2">{this.state.user.username}'s Listings</h2>
                            <div className="list-group mt-2">
                                <div className="list-group mt-2">
                                        {this.state.listings.map((listing, idx) =>
                                            <ListingRowComponent
                                                key={idx}
                                                idx={idx}
                                                listing={listing}
                                                city={this.state.city}
                                                type="bazaar"
                                                />
                                        )}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default PublicProfileComponent;
