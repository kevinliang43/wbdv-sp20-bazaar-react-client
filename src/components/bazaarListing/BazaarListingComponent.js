import React from "react";
import {parseDate} from "../../utils/StringUtils"
import listingService from "../../services/BazaarListingService"
import NavBarComponent from "../NavBarComponent"
import userService from "../../services/UserService";
import {deleteListingAction, updateListingAction} from "../../actions/listingActions"
import {connect} from "react-redux";
import "./BazaarListingComponent.css"




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
        listing : {},
        editing: false
    }

    updateListing = () => {
        this.props.updateListing(this.props.profile.id, this.props.listingId, this.state.listing);
        this.setState({editing: false});
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

                <div className="row">

                {this.state.editing &&

                    <div className="col">
                        <div class="form-group">
                        <label for="listingTitle">Listing Title</label>
                        <input class="form-control" id="listingTitle" placeholder="Enter a Listing title"
                            onChange={e => this.setState({listing: {...this.state.listing, title: e.target.value}})}
                            value={this.state.listing.title}/>
                        </div>

                    <div class="form-group">
                        <label for="listingDescription">Listing Description</label>
                        <textarea class="form-control " id="listingDescription" placeholder="Enter a Listing Description"
                            onChange={e => this.setState({listing: {...this.state.listing, description: e.target.value}})}
                            value={this.state.listing.description}/>
                    </div>

                    <div class="form-group">
                        <label for="listingPrice">Listing Price (in USD)</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control" id="listingPrice" placeholder="Enter a Listing Price"
                                onChange={e => this.setState({listing: {...this.state.listing, price: e.target.value}})}
                                value={this.state.listing.price}/>
                        </div>
                        <small id="priceHelp" class="form-text text-muted">Example: 42.69</small>
                    </div>

                    {this.state.listing.type === 'PRODUCT' &&
                            <div class="form-group">
                            <label for="listingDescription">Image URL</label>
                            <input type="url" class="form-control " id="listingDescription" placeholder="Enter an Image Link to add an image to your listing"
                                onChange={e => this.setState({listing: {...this.state.listing, imageUrl: e.target.value}})}
                                value={this.state.listing.imageUrl}/>
                            </div>
                    }

                    <button className="btn btn-success mt-3 col" onClick={() => this.updateListing()}>
                        Submit Updates
                    </button>


                    
                    </div>
                }
                
                {!this.state.editing &&
                    <div className="col">
                    <h2 className="mt-3">{this.state.listing.title}</h2>
                    <h4>${this.state.listing.price}</h4>
                        <p>{this.state.listing.description}</p>
                        <br/>
                        <p>Posted: {parseDate(this.state.listing.date)}</p>
                        
                        {Object.keys(this.props.profile).length > 0 && Object.keys(this.state.user).length > 0 && this.state.user.id === this.props.profile.id &&
                            <div>
                                <button className="btn btn-success mt-3 col" onClick={() => this.setState({editing : true})}>
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
                }


                    <div className="col-8">
                        {this.state.listing.imageUrl &&
                            <img class="m-3" id="bazaar-image"
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
                        dispatch(deleteListingAction(listing.id))),
        updateListing: (uid, listingId, newListing) =>
            listingService.updateListing(uid, listingId, newListing)
                .then(result => 
                    dispatch(updateListingAction(newListing)))
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(BazaarListingComponent)