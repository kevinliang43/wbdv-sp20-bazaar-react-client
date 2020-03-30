import React from "react";
import ListingRowComponent from "../components/ListingRowComponent"
import {searchListings} from "../services/CraigslistService"
import {defaultCity} from "../constants"
import {normalizeCity} from "../utils/StringUtils"
import ListingCardComponent from "../components/ListingCardComponent";
import FooterComponent from "../components/FooterComponent";


export default class CraigslistSearchComponent extends React.Component {

    componentDidMount() {
        let searchQuery = this.props.match.params.searchPost;
        let searchCity = this.props.match.params.city;
        if (searchCity) {
            this.setState({city: searchCity})
        }
        if (searchQuery) {
            this.setState({searchQuery: searchQuery})
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
            <div className="mt-4">
            <h2>Search Listings
                {this.state.view === 'LIST' &&
                    <button className="btn btn-success float-right" onClick={() => this.setState({view: 'GRID'})}>
                        <i className="fa fa-th"/>
                    </button>
                }
                {this.state.view === 'GRID' &&
                    <button className="btn btn-success float-right" onClick={() => this.setState({view: 'LIST'})}>
                    <i className="fa fa-list"></i>
                    </button>
                }
            </h2>

            <div class="form-group">
                <label for="searchQuery" class="col-form-label">Search Bazaar</label>
                <input className={`form-control`}
                        onChange={e => this.setState({searchQuery: e.target.value})}
                        value={this.state.searchQuery}
                        placeHolder={`Search for Listings`}/>

                <label for="searchCity" class="col-form-label">City</label>
                <input className={`form-control`}
                        onChange={e => this.setState({city: e.target.value})}
                        value={this.state.city}
                        placeHolder={`City to search for listings in`}/>
            </div>

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
            <FooterComponent/>
        </div>
        )
    }
}