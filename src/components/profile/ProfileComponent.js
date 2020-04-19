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
import defaultProPic from '../../images/defaultProfilePic.jpg';
import {capitalizeAllFirstLetter} from "../../utils/StringUtils"

export default class ProfileComponent extends React.Component {
    state = {
        listings: [],
        searchQuery: '',
        city: 'boston',
        view: 'LIST',
        editing: false,
        activeTab: 'LISTINGS',
        profile: this.props.profile,
        profileUpdateState: {},
    };

    save = () => {
        userService.updateProfile(this.state.profile)
            .then(newProfileUpdateState => {
                this.props.retrieveSession();
                this.setState(prevState => (
                    {
                        ...prevState,
                        'profileUpdateState': newProfileUpdateState
                    }));
            });
    };

    updateStateProfile(currentKey, newValue) {
        this.setState(prevState => ({
            profile: {
                ...prevState.profile,
                [currentKey]: newValue
            }
        }))
    }

    deleteAccount = () => {
        userService.deleteUser(this.state.profile.id)
            .then(() => {
                console.log('then reached');
                this.props.logout();
                this.setState({
                    profile: {}
                })
            })
            .catch(e => {
                console.log('Delete User: Server Side Error', e.message)
                alert('There was a problem while trying to delete your account. Please try again later.')
            })
    }

    componentDidMount() {
        searchListings("boston", "jacket", 3)
            .then(results => this.setState({
                    listings: results
                }
            ))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.profile !== this.props.profile) { //If BazaarContainer retrieves updated profile (example: after make update request)
            this.setState({profile: {...this.props.profile}})
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <NavBarComponent
                    profile={this.props.profile}
                    logout={this.props.logout}
                />
                {
                    Object.keys(this.props.profile).length === 0 &&
                    <div className="row d-flex justify-content-center profile-nosession align-items-center p-5">
                        <div className="col-sm-4 col-10 text-center border rounded pb-4 pt-3">
                            <h4>Sign up to create a Bazaar profile</h4>
                            <a className="btn btn-block btn-success" href="/register">Register</a>
                            <h4 className="mt-4">Returning User?</h4>
                            <a className="btn btn-block btn-secondary" href="/login">Log In</a>
                        </div>
                    </div>
                }
                {Object.keys(this.props.profile).length !== 0 &&
                <div className="row">
                    <div className="col-4 border border-success">
                        {
                            Object.keys(this.state.profileUpdateState).length !== 0 &&
                            this.state.profileUpdateState.type === 'SUCCESS' && this.state.editing &&
                            <div className="alert alert-success mt-3" role="alert">
                                User has been updated.
                            </div>
                        }
                        {
                            Object.keys(this.state.profileUpdateState).length !== 0 &&
                            this.state.profileUpdateState.type === 'ERROR' && this.state.editing &&
                            <div className="alert alert-danger mt-3" role="alert">
                                <h4>ERROR</h4>
                                {this.state.profileUpdateState.errorMessages.map(errorMessage =>
                                    <p>{errorMessage}</p>
                                )}
                            </div>
                        }
                        {
                            this.state.editing &&
                            <form className="pt-2">
                                <h2>Edit Profile</h2>
                                <div className="form-group row my-2">
                                    <label htmlFor="usernameFld" className="col-sm col-form-label">
                                        Username
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="usernameFld"
                                               type="url"
                                               onChange={(e) =>
                                                   this.updateStateProfile('username', e.target.value)}
                                               value={this.state.profile.username}/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="passwordFld" className="col-sm col-form-label">
                                        Password
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="passwordFld"
                                               type="password"
                                               onChange={(e) =>
                                                   this.updateStateProfile('password', e.target.value)}
                                               value={this.state.profile.password}/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="confirmPasswordFld" className="col-sm col-form-label">
                                        Confirm Password
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="confirmPasswordFld"
                                               type="password"
                                               onChange={(e) =>
                                                   this.updateStateProfile('confirmPassword', e.target.value)}
                                               value={this.state.profile.confirmPassword}
                                               placeholder="Confirm password to save changes"/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="firstNameFld" className="col-sm col-form-label">
                                        First Name
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="firstNameFld"
                                               onChange={(e) =>
                                                   this.updateStateProfile('firstName', e.target.value)}
                                               value={this.state.profile.firstName}/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="lastNameFld" className="col-sm col-form-label">
                                        Last Name
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="lastNameFld"
                                               onChange={(e) =>
                                                   this.updateStateProfile('lastName', e.target.value)}
                                               value={this.state.profile.lastName}/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="phoneFld" className="col-sm col-form-label">
                                        Phone
                                    </label>
                                    <div className="col-sm-8">
                                        {/*TODO: Currently no phone-number field in User model. Readonly for now.*/}
                                        <input className="form-control"
                                               id="phoneFld"
                                               type="tel"
                                               placeholder="555-555-5555" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="emailFld" className="col-sm col-form-label">
                                        Email
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="emailFld"
                                               type="email"
                                               onChange={(e) =>
                                                   this.updateStateProfile('email', e.target.value)}
                                               value={this.state.profile.email}/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label htmlFor="dobFld" className="col-sm col-form-label">
                                        Profile Picture
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="imageUrlFld"
                                               onChange={(e) =>
                                                   this.updateStateProfile('imageUrl', e.target.value)}
                                               value={this.state.profile.imageUrl}
                                               placeholder="Enter a URL to add profile picture"/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <label className="col-sm col-form-label">
                                        City
                                    </label>
                                    {/*TODO: City, subregion, region selection like in Register Page*/}
                                    <div className="col-sm-8">
                                        <input className="form-control"
                                               id="cityFld"
                                               onChange={(e) =>
                                                   this.updateStateProfile('city', e.target.value)}
                                               value={this.state.profile.city}/>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <div className="col-sm">
                                        <button className="btn btn-block btn-success"
                                                id="updateBtn" type="button"
                                                onClick={(e) => this.save()}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-block btn-danger" data-toggle="modal"
                                                data-target="#exampleModal">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group row my-2">
                                    <div className="col-sm">
                                        <button className="btn btn-block btn-secondary"
                                                id="backBtn" type="button"
                                                onClick={(e) =>
                                                    this.setState({editing: false})}>
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        }
                        {
                            !this.state.editing &&
                            <div className="col pt-4">
                                <img className="justify-content-center img-fluid"
                                     src={this.state.profile.imageUrl ? this.state.profile.imageUrl : defaultProPic}/>
                                <h3 className="mt-2">
                                    {this.props.profile.username}
                                </h3>
                                <span>
                                <b>Operating Location: </b>
                                    {capitalizeAllFirstLetter(this.props.profile.city)}
                                </span>
                                <button className="btn btn-block btn-success my-3"
                                        id="editBtn" type="button"
                                        onClick={() => this.setState({
                                            editing: true,
                                            profileUpdateState: {}
                                        })}>
                                    Edit Profile
                                </button>
                            </div>
                        }
                    </div>
                    <div className="col border border-success pt-3">
                        <ul className="nav nav-tabs nav-fill">
                            <li onClick={() => this.setState({activeTab: 'LISTINGS'})}
                                className="nav-item">
                                <a className={`btn nav-link ${this.state.activeTab === 'LISTINGS' ? 'active' : ''}`}>Listings</a>
                            </li>
                            <li onClick={() => this.setState({activeTab: 'FAVORITES'})}
                                className="nav-item">
                                <a className={`btn nav-link ${this.state.activeTab === 'FAVORITES' ? 'active' : ''}`}>Favorites</a>
                            </li>
                        </ul>
                        {
                            this.state.activeTab === 'LISTINGS' &&
                            <div>
                                <h2 className="py-2">My Listings</h2>
                                {/*TODO: Show listings made by this user. Current placeholder is just 3 listings for "jacket" in Boston made on Craigslist.com*/}
                                {
                                    this.state.view === 'LIST' &&
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
                        }
                        {
                            this.state.activeTab === 'FAVORITES' &&
                            <div>
                                <h2 className="py-2">My Favorites</h2>
                                {/*TODO: Show listings favorited by this user.*/}
                            </div>
                        }
                    </div>
                </div>}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header no-border bg-dark text-white">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Bazaar Account</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete your account?
                            </div>
                            <div className="modal-footer no-border">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal"
                                        onClick={() => this.deleteAccount()}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}