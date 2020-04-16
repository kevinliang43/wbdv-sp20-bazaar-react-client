import React from "react"
import {normalizeCity} from "../utils/StringUtils"
import {Link} from "react-router-dom"
import {profile, logout} from "../services/UserService"

export default class NavBarComponent extends React.Component {

    state = {
        searchQuery : '',
        searchCity: ''
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark row sticky-top">
                <a class="navbar-brand" href="/">Bazaar</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/search">Search</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/profile">Profile</a>
                        </li>
                        {Object.keys(this.props.profile).length == 0 &&
                            <li class="nav-item">
                            <a class="nav-link" href="/register">Register</a>
                            </li>}
                        {Object.keys(this.props.profile).length > 0 &&
                            <li class="nav-item">
                            <a class="nav-link" href="/createlisting">Create Listing</a>
                            </li>}
                    </ul>

                    <form class="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Listings"
                               onChange={e => this.setState({searchQuery: e.target.value})}/>
                        <input class="form-control mr-sm-2" type="search" placeholder="Search City"
                               onChange={e => this.setState({searchCity: e.target.value})}/>
                        <a class="btn btn-outline-success my-2 mr-2 my-sm-0"
                           href={`/search/${normalizeCity(this.state.searchCity)}/${this.state.searchQuery}`}>Search</a>

                        {Object.keys(this.props.profile).length == 0 &&
                        <a class="btn btn-outline-success my-2 my-sm-0"
                            href={`/login`}>Log In</a>
                        }
                        {Object.keys(this.props.profile).length > 0 &&
                        <a class="btn btn-outline-danger my-2 my-sm-0 text-danger"
                            onClick={() => this.props.logout()}
                            href={`/`}>Log Out</a>
                        }
                    </form>
                </div>
            </nav>

        

        )
    }


}