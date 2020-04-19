import React from "react";
import {getListingDetails, searchListings}from "../services/CraigslistService"
import {parseDate} from "../utils/StringUtils"

export default class CraigslistPostDetailsComponent extends React.Component {

    componentDidMount() {
        let searchCity = this.props.match.params.city;
        let listingID = this.props.match.params.listingID;

        searchListings(searchCity, listingID, 1)
            .then(response => this.setState({listing: response[0]}))
            .then(result => getListingDetails(this.state.listing.listingUrl))
            .then(listingDetails => this.setState({listing: {...this.state.listing, ['description']: listingDetails['description']}}))
    }

    state = {
        listing: {
            imagePaths: []
        }
    }

    render() {
        return (
            <div>
                {console.log(this.props.history)}
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
                        {this.state.listing.source === 'craigslist' &&
                            <a className="btn btn-success" href={this.state.listing.listingUrl}>
                                View Listing on Craigslist
                            </a>}
                    </div>
                    <div className="col-8">{this.state.listing.imagePaths.map((imagePath) =>
                        <img className="m-3"
                             src={`https://images.craigslist.org/${imagePath}_300x300.jpg`}/>
                    )}
                    </div>
                </div>
            </div>
        )
    }
}