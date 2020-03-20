import React from "react";
import "./LoginComponent.css"

const LoginComponent = () => 
    <div class="row d-flex justify-content-center bg-dark">
        <div className="col-sm-6 col-10 text-center">
            <div className="text-white">
                <h1 className="display-2 mt-5">Bazaar</h1>
                <hr className="border-color-white row"/>
                <h1 className="display-5">Log In</h1>

            </div>


            <form>
                <div className="form-group row">
                    <label for="username" class="col-form-label text-white">
                        Username 
                    </label>
                    <input class="form-control" placeholder="Username"/>
                </div>

                <div className="form-group row">
                    <label for="password" class="col-form-label text-white">
                        Password
                    </label>
                    <input type="password" class="form-control" placeholder="Password"/>
                </div>

                <br/>

                <div className="form-group row">
                    <button className="btn btn-block btn-success">Login</button>
                    <a className="btn btn-block btn-success" href="/register">Register</a>
                    <button className="btn btn-block btn-danger">Cancel</button>
                </div>
            </form>

        </div>
    </div>

export default LoginComponent