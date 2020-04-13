import React from "react";
import "./LoginComponent.css"
import {login} from "../../services/UserService"

export default class LoginComponent extends React.Component {

    state = {
        username: '',
        password: '',
        loginError: false
    }

    login = () =>
        login({
            username: this.state.username,
            password: this.state.password
        })
            .then(result => this.props.history.push('/profile'))
            .catch(e => this.setState({loginError: true}))


    render () {
        return (

            <div class="row d-flex justify-content-center bg-dark">
                <div className="col-sm-6 col-10 text-center">
                    <div className="text-white">
                        <h1 className="display-2 mt-5">Bazaar</h1>
                        <hr className="border-color-white row"/>
                        <h1 className="display-5">Log In</h1>

                    </div>

                    {this.state.loginError &&
                        <div class="alert alert-danger" role="alert">
                            Username and Password combination not found
                        </div>
                    }


                    <form>
                        <div className="form-group row">
                            <label for="username" class="col-form-label text-white">
                                Username 
                            </label>
                            <input class="form-control" placeholder="Username" value={this.state.username}
                                onChange={(e) => this.setState({
                                    username: e.target.value
                                })}/>
                        </div>

                        <div className="form-group row">
                            <label for="password" class="col-form-label text-white">
                                Password
                            </label>
                            <input type="password" class="form-control" placeholder="Password" value={this.state.password}
                                onChange={(e) => this.setState({
                                    password: e.target.value
                                })}
                            />
                        </div>

                        <br/>

                        <div className="form-group row">
                            <button className="btn btn-block btn-success"
                                onClick={(e) => {
                                    e.preventDefault();//FIXME: Temporary workaround Prevents refreshing of the page (in order to show alert.)
                                    this.login();
                                }}>Login</button>
                            <a className="btn btn-block btn-success" href="/register">Register</a>
                            <a className="btn btn-block btn-danger" href="/">Cancel</a>
                        </div>
                    </form>

                </div>
            </div>

        )
    }

}