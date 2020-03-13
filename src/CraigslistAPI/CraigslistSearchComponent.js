import React from "react";
import ListingRowComponent from "../components/ListingRowComponent"
import {searchListings} from "../services/CraigslistService"
import {defaultCity} from "../constants"
import {normalizeCity} from "../utils/StringUtils"
import ListingCardComponent from "../components/ListingCardComponent";


export default class CraigslistSearchComponent extends React.Component {

    componentDidMount() {
        let searchQuery = this.props.match.params.searchPost;
        let searchCity = this.props.match.params.city;
        if (searchCity) {
            this.setState({city: searchCity})
        }
        if (searchQuery) {
            this.getListings(searchCity, searchQuery)
        }
    }

    state = {
        listings : [],
        searchQuery: '',
        city: '',
        view: 'GRID'
    }

    getListings = (searchCity, searchQuery) => {
        if (!searchCity.replace(/\s/g, '')) {
            searchCity = defaultCity;
        }
        searchCity = normalizeCity(searchCity);
        this.props.history.push(`/search/${searchCity}/${searchQuery}`)
        searchListings(searchCity, searchQuery, 20)
            .then(results => this.setState({
                listings : results
            }))
    }

    render() {
        return (
            <div>
            <h2>Search Listings</h2>
            {this.state.view == 'LIST' &&
                <button onClick={() => this.setState({view: 'GRID'})}>Grid View</button>
            }
            {this.state.view == 'GRID' &&
                <button onClick={() => this.setState({view: 'LIST'})}>List View</button>
            }
            <input className={`form-control`}
                    onChange={e => this.setState({searchQuery: e.target.value})}
                    value={this.state.searchQuery}
                    placeHolder={`Search for Listings`}/>
            <input className={`form-control`}
                    onChange={e => this.setState({city: e.target.value})}
                    value={this.state.city}
                    placeHolder={`City to search for listings in`}/>

            <button className={`btn btn-success btn-block`}
                    onClick={() => this.getListings(this.state.city, this.state.searchQuery)}>
                        Search
            </button>
                {this.state.view === 'LIST' && 

                    <ul className={`list-group mt-2`}>
                        {this.state.listings.map((listing, idx) =>
                                <ListingRowComponent
                                    idx={idx}
                                    listing={listing}
                                    city={this.state.city}/>
                        )}
                    </ul>
                }
                {this.state.view === 'GRID' && 
                    <div className="card-deck row m-1 no-gutters">
                        {this.state.listings.map((listing, idx) =>
                        <ListingCardComponent
                            idx={idx}
                            listing={listing}
                            city={this.state.city}/>
                    )}
                    </div>
                }
        </div>
        )
    }
}