import React from "react";
import "./RegisterComponent.css"
import userService from "../../services/UserService"
import { capitalizeAllFirstLetter } from "../../utils/StringUtils"
import { connect } from "react-redux";

class RegisterComponent extends React.Component {

    state = {
        firstName : '',
        lastName : '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        registrationState: {},

        continentList: [],
        regionList: [],
        subregionList: [],
        selectedContinent: '',
        selectedRegion: '',
        selectedSubregion: '',
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.locations !== this.props.locations) {

            let continentList = this.getContinents();
            let selectedContinent = continentList[0];
            let regionList = this.getRegionsForContinent(selectedContinent);
            let selectedRegion = regionList[0];
            let subregionList = this.getSubregionsForRegion(selectedContinent, selectedRegion);
            let selectedSubregion = subregionList[0][1];

            this.setState(prevState => (
                {
                    ...prevState,
                    'continentList': continentList,
                    'selectedContinent': selectedContinent,
                    'regionList': regionList,
                    'selectedRegion': selectedRegion,
                    'subregionList': subregionList,
                    'selectedSubregion': selectedSubregion
                }
            ))
        }
    }

    updateField(currentKey, newValue) {
        this.setState(prevState => (
            {
                ...prevState,
                [currentKey]: newValue
            }
        ))
    }

    register() {
        userService.registerUser({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            city: this.state.selectedSubregion

        })
            .then(newRegistrationState => {
                this.setState(prevState => (
                    {...prevState,
                        'registrationState': newRegistrationState
                    }))
                }
            )
    }

    getContinents = () => {
        return Object.keys(this.props.locations);
    }

    getRegionsForContinent = (continent) => {
        return Object.keys(this.props.locations[continent]['regions']);
    }

    getSubregionsForRegion = (continent, region) => {
        return Object.entries(this.props.locations[continent]['regions'][region])
    }

    render() {
        return (
            <div class="row d-flex justify-content-center bg-dark">
        <div className="col-sm-6 col-10 text-center">
            <div className="text-white">
                <h1 className="display-2 mt-5">Bazaar</h1>
                <hr className="border-color-white row"/>
                <h1 className="display-5">Register</h1>
                <br></br>

            {Object.keys(this.state.registrationState).length !== 0 && this.state.registrationState.type === 'SUCCESS' &&
                <div class="alert alert-success" role="alert">
                    New User '{this.state.registrationState.newUsername}' has been created.
                </div>
            }

            {Object.keys(this.state.registrationState).length !== 0 && this.state.registrationState.type === 'ERROR' &&
                <div class="alert alert-danger" role="alert">
                    <h4>ERROR</h4>
                    {this.state.registrationState.errorMessages.map(errorMessage =>
                        <p>{errorMessage}</p>
                        )}
                </div>
            }

            </div>


            <form>
                <div class="form-group row">
                        <div class="col">
                            <label for="first-name" class="col-form-label text-white float-left">
                                First Name 
                            </label>
                            <input type="text" name="firstname" class="form-control" placeholder="First Name"
                                onChange={(e) => this.updateField("firstName", e.target.value)
                                }/> 
                        </div>
                        <div class="col">
                            <label for="last-name" class="col-form-label text-white float-left">
                                Last Name 
                            </label>
                            <input type="text" name="lastname" class="form-control" placeholder="Last Name"
                                onChange={(e) => this.updateField("lastName", e.target.value)
                                }/>
                        </div>
                </div>

                <div className="form-group">
                    <label for="email" class="col-form-label text-white float-left">
                        Email 
                    </label>
                    <input class="form-control" type="email" placeholder="Email"
                        onChange={(e) => this.updateField("email", e.target.value)
                        }/>
                </div>

                <div className="form-group">
                    <label for="username" class="col-form-label text-white float-left">
                        Username 
                    </label>
                    <input class="form-control" placeholder="Username"
                        onChange={(e) => this.updateField("username", e.target.value)
                        }/>
                </div>

                <div className="form-group">
                    <label for="password" class="col-form-label text-white float-left">
                        Password
                    </label>
                    <input type="password" class="form-control" placeholder="Password"
                        onChange={(e) => this.updateField("password", e.target.value)
                        }/>
                </div>

                <div className="form-group">
                    <label for="confirm-password" class="col-form-label text-white float-left">
                        Confirm Password
                    </label>
                    <input type="password" class="form-control" placeholder="Confirm Password"
                        onChange={(e) => this.updateField("confirmPassword", e.target.value)
                        }/>
                </div>

                <div class="form-group row">
                    <div class="form-group col-md-4">
                        <label for="inputContinent" class="col-form-label text-white float-left">Continent</label>
                        <select id="inputContinent" class="form-control"
                            onChange={(e) => {
                                let selectedContinent = e.target.value;
                                let regionList = this.getRegionsForContinent(selectedContinent);
                                let selectedRegion = regionList[0];
                                let subregionList = this.getSubregionsForRegion(selectedContinent, selectedRegion);
                                let selectedSubregion = subregionList[0][1];
                    
                                this.setState(prevState => (
                                    {
                                        ...prevState,
                                        'selectedContinent': selectedContinent,
                                        'regionList': regionList,
                                        'selectedRegion': selectedRegion,
                                        'subregionList': subregionList,
                                        'selectedSubregion': selectedSubregion
                                    }))}}>
                            {this.state.continentList && this.state.continentList.map(continentKey => 
                                <option key={continentKey} value={continentKey}>{this.props.locations[continentKey]['continentName']}</option>
                            )}
                        </select>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="inputRegion" class="col-form-label text-white float-left">Region</label>
                        <select id="inputRegion" class="form-control" 
                            onChange={(e) => {
                                let selectedRegion = e.target.value;
                                let subregionList = this.getSubregionsForRegion(this.state.selectedContinent, selectedRegion);
                                let selectedSubregion = subregionList[0][1];
                    
                                this.setState(prevState => (
                                    {
                                        ...prevState,
                                        'selectedRegion': selectedRegion,
                                        'subregionList': subregionList,
                                        'selectedSubregion': selectedSubregion
                                    }))}}>
                            {this.state.regionList && this.state.regionList.map(regionKey => 
                                <option key={regionKey} value={regionKey}>{regionKey}</option>
                            )}
                        </select>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="inputSubregion" class="col-form-label text-white float-left">Subregion</label>
                        <select id="inputSubregion" class="form-control" 
                            onChange={(e) => {
                                this.updateField("selectedSubregion", e.target.value)
                            }}
                        >
                            {this.state.subregionList && this.state.subregionList.map(subregionKey => 
                                <option key={subregionKey[0]} value={subregionKey[1]}>{capitalizeAllFirstLetter(subregionKey[0])}</option>
                            )}
                        </select>                    
                    </div>

                </div>
                

                <br/>

                <div className="form-group row">
                    <button className="btn btn-block btn-success"
                        onClick={(e) => {
                            e.preventDefault();//FIXME: Temporary workaround Prevents refreshing of the page (in order to show alert.)
                            this.register();
                        }
                        }
                    >Register</button>
                    <a className="btn btn-block btn-success" href="/login">Login</a>
                    <a className="btn btn-block btn-danger" href="/">Cancel</a>
                </div>
            </form>

        </div>
    </div>


        )
    }
}

export default connect()(RegisterComponent)