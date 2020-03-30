import React from "react";
import "./RegisterComponent.css"

const RegisterComponent = () => 
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
                            <input type="text" name="firstname" class="form-control" placeholder="First Name"/> 
                        </div>
                        <div class="col">
                            <label for="last-name" class="col-form-label text-white float-left">
                                Last Name 
                            </label>
                            <input type="text" name="lastname" class="form-control" placeholder="Last Name"/>
                        </div>
                </div>

                <div className="form-group">
                    <label for="email" class="col-form-label text-white float-left">
                        Email 
                    </label>
                    <input class="form-control" type="email" placeholder="Username"/>
                </div>

                <div className="form-group">
                    <label for="username" class="col-form-label text-white float-left">
                        Username 
                    </label>
                    <input class="form-control" placeholder="Username"/>
                </div>

                <div className="form-group">
                    <label for="password" class="col-form-label text-white float-left">
                        Password
                    </label>
                    <input type="password" class="form-control" placeholder="Password"/>
                </div>

                <div className="form-group">
                    <label for="confirm-password" class="col-form-label text-white float-left">
                        Confirm Password
                    </label>
                    <input type="password" class="form-control" placeholder="Password"/>
                </div>

                <div class="form-group row">
                    <div class="form-group col-md-6">
                        <label for="inputCity" class="col-form-label text-white float-left">City</label>
                        <input type="text" class="form-control" id="inputCity" placeholder="City"/>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="inputState" class="col-form-label text-white float-left">State</label>
                        <select id="inputState" class="form-control" >
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
                            <option value="MA">Massachusetts</option>
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

                    <div class="form-group col-md-2">
                        <label for="inputZip" class="col-form-label text-white float-left">Zip</label>
                        <input type="text" class="form-control" id="inputZip" placeholder="Zip"/>
                    </div>

                </div>

                

                <br/>

                <div className="form-group row">
                    <button className="btn btn-block btn-success">Register</button>
                    <a className="btn btn-block btn-success" href="/login">Login</a>
                    <a className="btn btn-block btn-danger" href="/">Cancel</a>
                </div>
            </form>

        </div>
    </div>

export default RegisterComponent