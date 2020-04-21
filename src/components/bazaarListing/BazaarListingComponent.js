import React from "react";
import {parseDate} from "../../utils/StringUtils"
import listingService from "../../services/BazaarListingService"
import NavBarComponent from "../NavBarComponent"
import userService from "../../services/UserService";
import {deleteListingAction} from "../../actions/listingActions"
import {connect} from "react-redux";




class BazaarListingComponent extends React.Component {

    componentDidMount() {
        listingService.findListingById(this.props.listingId)
            .then(listing => 
                this.setState({
                    listing: listing
                }))
            .then(results => userService.findUserById(this.state.listing.uid))
            .then(user => this.setState({
                ...this.state,
                user: user
            }))


    }

    state = {
        user: {},
        listing : {}
    }

    deleteListing = () =>
        this.props.deleteListing(this.props.profile, this.state.listing)
            .then(result => this.props.history.push("/profile"))

    render() {
        return (
            <div class="container-fluid">
                <NavBarComponent
                    profile = {this.props.profile}
                    logout = {this.props.logout}
                />
                {this.props.history.length >= 1 &&
                <button className="btn btn-success mt-3" onClick={() => this.props.history.goBack()}>
                    Back
                </button>}
                <h2 className="mt-3">{this.state.listing.title}</h2>
                <h4>{this.state.listing.price}</h4>
                <div className="row">
                    <div className="col">
                        <p>{this.state.listing.description}</p>
                        <br/>
                        <p>Posted: {parseDate(this.state.listing.date)}</p>
                        
                        {Object.keys(this.props.profile).length > 0 && Object.keys(this.state.user).length > 0 && this.state.user.id === this.props.profile.id &&
                            <div>
                                <button className="btn btn-success mt-3 col" >
                                    Update Listing
                                </button>
                                <button className="btn btn-danger mt-3 col" onClick={() => this.deleteListing()}>
                                    Delete Listing
                                </button>
                            </div>
                        }
                        {Object.keys(this.props.profile).length > 0 && Object.keys(this.state.user).length > 0 && this.state.user.id !== this.props.profile.id &&
                            <div>
                                <button className="btn btn-success mt-3" onClick={() => this.props.history.push(`/profile/${this.state.user.id}`)}>
                                    Visit {this.state.user.username}'s Profile
                                </button>
                            </div>
                        }

                    </div>


                    <div className="col-8">
                        {this.state.listing.imageUrl &&
                            <img className="m-3"
                                src={this.state.listing.imageUrl}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        listings: state.listings.listings
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        deleteListing: (user, listing) => 
            listingService.deleteListing(user.id, listing.id)
                .then(result =>
                        dispatch(deleteListingAction(listing.id)))
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(BazaarListingComponent)