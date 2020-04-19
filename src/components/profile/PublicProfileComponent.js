import React from 'react';
import NavBarComponent from "../NavBarComponent";
import UserService from "../../services/UserService";
import ListingRowComponent from "../ListingRowComponent";
import {searchListings} from "../../services/CraigslistService";
import defaultProPic from "../../images/defaultProfilePic.jpg"
import {capitalizeAllFirstLetter} from "../../utils/StringUtils";

class PublicProfileComponent extends React.Component {
    state = {
        user: {},
        listings: []
    };

    componentDidMount() {
        UserService.findUserById(this.props.userId)
            .then(result => this.setState({user: result}));
        searchListings("boston", "jacket", 3)
            .then(results => this.setState({listings: results}));
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBarComponent profile={this.props.profile} logout={this.props.logout}/>
                <div className="row">
                    <div className="col-4 border border-success">
                        <div className="col pt-4">
                            <img className="justify-content-center img-fluid"
                                 src={this.state.user.imageUrl ? this.state.user.imageUrl : defaultProPic}
                                 height="200" width="200"/>
                            <h3 className="mt-2">{this.state.user.username}</h3>
                            <span>
                                <b>Operating Location: </b>
                                {capitalizeAllFirstLetter(this.state.user.city ? this.state.user.city : '')}
                            </span>
                        </div>
                    </div>
                    <div className="col border border-success pt-3">
                        <div>
                            <h2 className="py-2">{this.state.user.username}'s Listings</h2>
                            {/*TODO: Show listings made by this user. Current placeholder is just 3 listings for "jacket" in Boston made on Craigslist.com*/}
                            <div className="list-group mt-2">
                                {this.state.listings.map((listing, idx) =>
                                    <ListingRowComponent
                                        idx={idx}
                                        listing={listing}
                                        city={this.state.city}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicProfileComponent;