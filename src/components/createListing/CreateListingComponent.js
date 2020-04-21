import "./CreateListingComponent.css"
import React from "react"
import {connect} from "react-redux";
import NavBarComponent from "../NavBarComponent";
import { capitalizeAllFirstLetter } from "../../utils/StringUtils"
import listingService from "../../services/BazaarListingService"
import {createListingAction} from "../../actions/listingActions"


class CreateListingComponent extends React.Component {

    state = {
        title : '',
        type: 'SERVICE',
        description: '',
        price: 0,
        imageUrl: '',
        city: this.props.profile.city,

        showErrors: false,
        errors: []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.profile !== this.props.profile) { //If BazaarContainer retrieves updated profile (example: after make update request)
            this.setState({city: this.props.profile.city})
        }
    }

    postListing = () => {
        let newErrors = this.listingChecks();

        if (newErrors.length > 0) {
            // Errors, Render error alert on the page
            this.setState({
                showErrors: true,
                errors: newErrors
            })
        }
        else {
            // No errors after checking, create the listing
            this.props.createListing(
                this.props.profile.id,
                {
                    title: this.state.title,
                    type: this.state.type,
                    description: this.state.description,
                    price: this.state.price,
                    imageUrl: this.state.imageUrl,
                    city: this.state.city,
                    date: Date.now(),
                    uid: this.props.profile.id
                }
            ).then(result => this.props.history.push(`/listings/${result.id}`))
        }

        console.log(this.state);

    }

    resetProductFields = () => 
    // Reset all Product-related fields
        this.setState(
            {
                imageUrl: ''
            }
        )

    regionToUrlMapping = require("../../services/serviceResources/regionToUrlMapping.json");

    listingChecks() {
        let newErrors = [];

        if (this.state.title.length === 0) {
            newErrors.push('Please Enter a Title for your Listing');
        }

        if (this.state.description.length === 0) {
            newErrors.push('Please Enter a Description for your Listing');
        }

        if (this.state.price.toString().split('.').length > 1 && this.state.price.toString().split('.')[1].length > 2) {
            newErrors.push('Please Enter a valid price for your Listing. Example: "42.55".');
        }

        return newErrors;
    }

    render() {
        return(
            <div className={`container-fluid`}>
                <NavBarComponent
                    profile = {this.props.profile}
                    logout = {this.props.logout}
                />
                {Object.keys(this.props.profile).length === 0 &&
                    <div className="row d-flex justify-content-center profile-nosession align-items-center p-5">
                        <div className="col-sm-4 col-10 text-center border rounded pb-4 pt-3">
                            <h4>Sign up to Create a Listing</h4>
                            <a className="btn btn-block btn-success" href="/register">Register</a>
                            <h4 className="mt-4">Returning User?</h4>
                            <a className="btn btn-block btn-secondary" href="/login">Log In</a>
                        </div>
                    </div>
                }
                {Object.keys(this.props.profile).length !== 0 &&
                <div class="mt-4">

                    <h2>Create a Listing</h2>
                    {this.state.showErrors &&
                        <div class="alert alert-danger text-center" role="alert">
                            <h4>ERROR</h4>
                            {this.state.errors.map(errorMessage =>
                            <p>{errorMessage}</p>
                            )}
                        </div>
                    }
                    <br></br>

                    <h4>Listing General Information</h4>
                    <div class="form-group">
                        <label for="listingTitle">Listing Title</label>
                        <input class="form-control" id="listingTitle" placeholder="Enter a Listing title"
                            onChange={e => this.setState({title: e.target.value})}
                            value={this.state.title}/>
                    </div>

                    <div class="form-group">
                        <label for="listingType">Type of Listing</label>
                        <select class="form-control" id="listingType"
                            onChange={e => {
                                this.setState({type: e.target.value});
                                if (e.target.value === "SERVICE") {
                                    // Reset all PRODUCT fields when switching to SERVICE listing type
                                    this.resetProductFields();
                                }
                                else {
                                    // Reset all SERVICE fields when switching to PRODUCT listing type
                                    //this.resetServiceFields();
                                }
                            }}
                            value={this.state.type}>
                            
                            <option value="SERVICE">Service</option>
                            <option value="PRODUCT">Product</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="listingDescription">Listing Description</label>
                        <textarea class="form-control " id="listingDescription" placeholder="Enter a Listing Description"
                            onChange={e => this.setState({description: e.target.value})}
                            value={this.state.description}/>
                    </div>

                    <div class="form-group">
                        <label for="listingPrice">Listing Price (in USD)</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number" class="form-control" id="listingPrice" placeholder="Enter a Listing Price"
                                onChange={e => this.setState({price: e.target.value})}
                                value={this.state.price}/>
                        </div>
                        <small id="priceHelp" class="form-text text-muted">Example: 42.69</small>
                    </div>

                    <br></br>
                    <h4>Listing Location Information</h4>

                    <div class="form-group">
                        <label for="cityFld">Region</label>
                            <select class="form-control" id="cityFld"
                                onChange={(e) => this.setState({city: e.target.value})
                            }
                                value={this.state.city}>
                                    {Object.keys(this.regionToUrlMapping).map(regionName =>
                                        <option key={regionName} value={this.regionToUrlMapping[regionName]}>{capitalizeAllFirstLetter(regionName)}</option>
                                    )}
                            </select>
                    </div>

                    {this.state.type === 'PRODUCT' &&
                        <div>
                            <br></br>
                            <h4>Product Specific Information</h4>

                            <div class="form-group">
                            <label for="listingDescription">Image URL</label>
                            <input type="url" class="form-control " id="listingDescription" placeholder="Enter an Image Link to add an image to your listing"
                                onChange={e => this.setState({imageUrl: e.target.value})}
                                value={this.state.imageUrl}/>
                            </div>
                        </div>

                    }

                    <button className="btn btn-block btn-success"
                        onClick={(e) => {
                            e.preventDefault();//FIXME: Temporary workaround Prevents refreshing of the page (in order to show alert.)
                            this.postListing();
                        }}>Post Listing</button>
                    <a className="btn btn-block btn-danger" href="/">Cancel</a>
                    
                </div>
            }

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
        createListing: (userId, listing) => 
            listingService.createListing(userId, listing)
                .then(newListing => {
                    dispatch(createListingAction(newListing));
                    return newListing;
                })
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CreateListingComponent)