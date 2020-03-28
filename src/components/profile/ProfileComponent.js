/*
Representation of the Profile page as a logged-in user viewing their own Profile
Profile page can only be accessed
2 Possibilities for a viewing a Profile page
 - User (logged-in) views their own Profile page with options to edit profile details, AKA private
 - User (logged-in or out) views a different user's Profile page, AKA public
 */

import React from "react";
import NavBarComponent from "../NavBarComponent";
import ListingRowComponent from "../ListingRowComponent";
import {searchListings} from "../../services/CraigslistService";

export default class ProfileComponent extends React.Component {
    state = {
        listings : [],
        searchQuery: '',
        city: 'boston',
        view: 'LIST',
        editing: true
    };


    render() {
        return (
            <div className="container-fluid">
                <NavBarComponent/>
                <h1>Profile</h1>
                <div className="row">
                    <div className="col-4 border border-success">
                        {this.state.editing && <form className="pt-3">
                            <div className="form-group row bazaar-public">
                                <label htmlFor="usernameFld" className="col-sm col-form-label">
                                    Username
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="usernameFld"
                                           placeholder="dhong82"/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-private">
                                <label htmlFor="passwordFld" className="col-sm col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="passwordFld" type="password" placeholder="********" readOnly/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-private">
                                <label htmlFor="firstNameFld" className="col-sm col-form-label">
                                    First Name
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="firstNameFld"
                                           placeholder="Duo" readOnly/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-private">
                                <label htmlFor="lastNameFld" className="col-sm col-form-label">
                                    Last Name
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="lastNameFld"
                                           placeholder="Hong" readOnly/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-private">
                                <label htmlFor="phoneFld" className="col-sm col-form-label">
                                    Phone
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="phoneFld"
                                           type="tel"
                                           placeholder="555-123-4567"/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-private">
                                <label htmlFor="emailFld" className="col-sm col-form-label">
                                    Email
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="emailFld" placeholder="johndoe@doe.com" type="email"/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-private">
                                <label htmlFor="dobFld" className="col-sm col-form-label">
                                    Birthday
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="dobFld" placeholder="03/24/1997" readOnly/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-public">
                                <label className="col-sm col-form-label">
                                    City
                                </label>
                                <div className="col-sm-8">
                                    <input className="form-control"
                                           id="OpCityFld"
                                           placeholder="Boston"/>
                                </div>
                            </div>
                            <div className="form-group row bazaar-public">
                                <label className="col-sm col-form-label">
                                    State
                                </label>
                                <div className="col-sm-8">
                                    <select id="inputState" className="form-control">
                                        <option value="AK">Alaska</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DC">District of Columbia</option>
                                        <option value="DE">Delaware</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="IA">Iowa</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option selected="selected" value="MA">Massachusetts</option>
                                        <option value="MD">Maryland</option>
                                        <option value="ME">Maine</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MT">Montana</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NY">New York</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VA">Virginia</option>
                                        <option value="VT">Vermont</option>
                                        <option value="WA">Washington</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm">
                                    <button className="btn btn-block btn-success"
                                            id="updateBtn" type="button" onClick={() => this.setState({editing: false})}>Update
                                    </button>
                                </div>
                            </div>
                        </form>}
                        {!this.state.editing &&
                        <div className="col mt-4">
                            <img className="justify-content-center img-responsive" src={"./defaultProfilePic.jpg"} height="200" width="200"/>
                            <h3 className="mt-2">
                                dhong82
                            </h3>
                            <span>
                                <b>Operating Location: </b>
                                Boston, Massachusetts
                            </span>
                            <button className="btn btn-block btn-success mt-3"
                                    id="updateBtn" type="button" onClick={() => this.setState({editing: true})}>Edit Profile
                            </button>
                        </div>
                        }
                    </div>
                    <div className="col border border-success">
                        <h3>
                            My Listings
                        </h3>
                        {this.state.view === 'LIST' && searchListings("boston", "tamagotchi", 20)
                            .then(results => this.setState({
                                listings: results
                            })) &&
                        <div className="list-group mt-2">
                            {this.state.listings.map((listing, idx) =>
                                <ListingRowComponent
                                    idx={idx}
                                    listing={listing}
                                    city={this.state.city}/>
                            )}
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}