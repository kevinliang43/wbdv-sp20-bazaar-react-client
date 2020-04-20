import React from "react";
import {parseDate} from "../../utils/StringUtils"
import listingService from "../../services/BazaarListingService"
import NavBarComponent from "../NavBarComponent"



export default class BazaarListingComponent extends React.Component {

    componentDidMount() {
        listingService.findListingById(this.props.listingId)
            .then(listing => 
                this.setState({
                    listing: listing
                }))
    }

    state = {
        listing : {}
    }

    render() {
        return (
            <div class="container-fluid">
                <NavBarComponent
                    profile = {this.props.profile}
                    logout = {this.props.logout}
                />
                {console.log(this.props)}
                {this.props.history.length >= 1 &&
                <button className="btn btn-success mt-3" onClick={() => this.props.history.goBack()}>
                    Back to Search Results
                </button>}
                <h2 className="mt-3">{this.state.listing.title}</h2>
                <h4>{this.state.listing.price}</h4>
                <div className="row">
                    <div className="col">
                        <p>{this.state.listing.description}</p>
                        <br/>
                        <p>Posted: {parseDate(this.state.listing.date)}</p>
                        
                        {/* TODO: Add delete/update buttons if this listing belongs to the owner.
                        
                        {this.props.listings && this.props.listings.indexOf(this.state.listing) !== -1 &&
                            <div>
                                <button className="btn btn-success mt-3" >
                                    Update Listing
                                </button>
                                <button className="btn btn-danger mt-3" >
                                    Delete Listing
                                </button>
                            </div>


                        } */}

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