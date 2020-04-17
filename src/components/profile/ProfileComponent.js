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
import userService from "../../services/UserService";
import "./ProfileComponent.css";


export default class ProfileComponent extends React.Component {
    state = {
        listings : [],
        searchQuery: '',
        city: 'boston',
        view: 'LIST',
        editing: false,
        profile: this.props.profile
    };

    save = () => {
        console.log("this is the state.profile object", this.state.profile);
        console.log("this is the props.profile object, any diff?", this.props.profile);
        userService.updateUser(this.state.profile.id, this.state.profile) //Keep in mind, this may fail
            .then(() => {
                this.props.retrieveSession();
                this.setState(
                    {
                        editing: false,
                    })
            })
            .catch(() => console.log('serverside error, handle this.')); //TODO: fix this.
    }

    componentDidMount() {
        console.log('this is this.props.profile upon mounting:', this.props.profile)
        searchListings("boston", "jacket", 5)
            .then(results => this.setState({
                listings: results
                }
            ))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.profile !== this.props.profile) { //If bazaarContainer retreives updated profile (example: after make update request)
            //TODO: Clean this up.
            this.setState({profile: this.props.profile})
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <NavBarComponent
                    profile = {this.props.profile}
                    logout = {this.props.logout}
                />
                {
                    Object.keys(this.props.profile).length === 0 &&
                    <div className="row d-flex justify-content-center profile-nosession align-items-center">
                        <div className="col-sm-4 col-10 text-center">
                            <h3>Sign up to create a Bazaar profile</h3>
                            <a className="btn btn-block btn-success" href="/register">Register</a>
                            <h3>Returning User?</h3>
                            <a className="btn btn-block btn-success" href="/login">Log In</a>
                        </div>
                    </div>
                }
                {Object.keys(this.props.profile).length !== 0 && <div className="row">
                    <div className="col-4 border border-success">
                        {
                            this.state.editing &&
                            <form className="pt-3">
                                <div className="form-group row bazaar-public">
                                    <label htmlFor="usernameFld" className="col-sm col-form-label">
                                        Username
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="usernameFld"
                                               onChange={(e) => {
                                                   const newUsername = e.target.value;
                                                   this.setState(prevState => ({
                                                       profile: {
                                                           ...prevState.profile,
                                                           username: newUsername
                                                       }
                                                   }))
                                               }}
                                               value={this.state.profile.username}/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-private">
                                    <label htmlFor="passwordFld" className="col-sm col-form-label">
                                        Password
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="passwordFld"
                                               type="password"
                                               onChange={(e) => {
                                                   const newPassword = e.target.value;
                                                   this.setState(prevState => ({
                                                       profile: {
                                                           ...prevState.profile,
                                                           password: newPassword
                                                       }
                                                   }))
                                               }}
                                               value={this.state.profile.password}/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-private">
                                    <label htmlFor="firstNameFld" className="col-sm col-form-label">
                                        First Name
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="firstNameFld"
                                               onChange={(e) => {
                                                   const newFirstName = e.target.value;
                                                   this.setState(prevState => ({
                                                       profile: {
                                                           ...prevState.profile,
                                                           firstName: newFirstName
                                                       }
                                                   }))
                                               }}
                                               value={this.state.profile.firstName}/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-private">
                                    <label htmlFor="lastNameFld" className="col-sm col-form-label">
                                        Last Name
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="lastNameFld"
                                               onChange={(e) => {
                                                   const newLastName = e.target.value;
                                                   this.setState(prevState => ({
                                                       profile: {
                                                           ...prevState.profile,
                                                           lastName: newLastName
                                                       }
                                                   }))
                                               }}
                                               value={this.state.profile.lastName}/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-private">
                                    <label htmlFor="phoneFld" className="col-sm col-form-label">
                                        Phone
                                    </label>
                                    <div className="col-sm-8">
                                        {/*TODO: Currently no phone-number field in User model. Readonly for now.*/}
                                        <input className="form-control"
                                               id="phoneFld"
                                               type="tel"
                                               placeholder="555-123-4567" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-private">
                                    <label htmlFor="emailFld" className="col-sm col-form-label">
                                        Email
                                    </label>
                                    <div className="col-sm-8">
                                        {/*TODO: Email check like in Register page*/}
                                        <input className="form-control"
                                               id="emailFld"
                                               type="email"
                                               onChange={(e) => {
                                                   const newEmail = e.target.value;
                                                   this.setState(prevState => ({
                                                       profile: {
                                                           ...prevState.profile,
                                                           email: newEmail
                                                       }
                                                   }))
                                               }}
                                               value={this.state.profile.email}/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-private">
                                    <label htmlFor="dobFld" className="col-sm col-form-label">
                                        Birthday
                                    </label>
                                    <div className="col-sm-8">
                                        {/*TODO: DOB field is currently not part of Registration. Readonly for now.*/}
                                        <input className="form-control"
                                               id="dobFld" placeholder="03/24/1997" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row bazaar-public">
                                    <label className="col-sm col-form-label">
                                        City
                                    </label>
                                    {/*TODO: City, subregion, region selection like in Register Page*/}
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="cityFld"
                                               onChange={(e) => {
                                                   const newCity = e.target.value;
                                                   this.setState(prevState => ({
                                                       profile: {
                                                           ...prevState.profile,
                                                           city: newCity
                                                       }
                                                   }))
                                               }}
                                               value={this.state.profile.city}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm">
                                        <button className="btn btn-block btn-success"
                                                id="updateBtn" type="button"
                                                onClick={() => this.save()}>Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        }
                        {!this.state.editing &&
                        <div className="col mt-4">
                            <img className="justify-content-center img-fluid" src={"./defaultProfilePic.jpg"}
                                 height="200" width="200"/>
                            <h3 className="mt-2">
                                {this.props.profile.username}
                            </h3>
                            <span>
                                <b>Operating Location: </b>
                                {this.props.profile.city}
                            </span>
                            <button className="btn btn-block btn-success my-3"
                                    id="updateBtn" type="button"
                                    onClick={() => this.setState({
                                        editing: true,
                                    })}>
                                Edit Profile
                            </button>
                        </div>
                        }
                    </div>
                    <div className="col border border-success">
                        <h3>
                            Listings
                        </h3>
                        {this.state.view === 'LIST' &&
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
                </div>}
            </div>
        )
    }

}