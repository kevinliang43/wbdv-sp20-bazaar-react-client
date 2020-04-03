import React from "react";
import "./RegisterComponent.css"
import userService from "../../services/UserService"

export default class RegisterComponent extends React.Component {

    state = {
        firstName : '',
        lastName : '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        city: ''
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
        userService.registerUser(this.state)
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

                <div class="form-group">
                    <label for="inputCity" class="col-form-label text-white float-left">
                        City
                    </label>
                    <input type="text" class="form-control" id="inputCity" placeholder="City"
                        onChange={(e) => this.updateField("city", e.target.value)
                        }/>
                </div>

                

                <br/>

                <div className="form-group row">
                    <button className="btn btn-block btn-success"
                        onClick={(e) => {
                            e.preventDefault();
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