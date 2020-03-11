import React from "react";
import {Client} from "node-craigslist"
import {searchListings} from "../services/CraigslistService"


export default class CraigslistSearchComponent extends React.Component {

    componentDidMount() {
        let searchQuery = this.props.match.params.searchPost;
        if(searchQuery) {
            this.getListings(searchQuery)
        }
    }

    state = {
        listings : [],
        searchQuery: '',
        city: 'boston'
    }

    getListings = (searchQuery) => {
        searchListings(this.state.city, searchQuery, 20)
            .then(results => this.setState({
                listings : results
            }))


    }

    render() {
        return (
            <div>
            <h2>Search Listings</h2>
            <input className={`form-control`}
                    onChange={e => this.setState({searchQuery: e.target.value})}
                    value={this.state.searchQuery}/>
            <button className={`btn btn-success btn-block`}
                    onClick={() => this.getListings(this.state.searchQuery)}>
                        Search For Listings
            </button>

            <ul className={`list-group`}>
                {this.state.listings.map((listing, idx) =>
                    <li className={`list-group-item`} key={idx}>
                        {listing.title + " -- Price:" + listing.price}
                    </li>
                )

                }
            </ul>
        </div>
        )
    }
}