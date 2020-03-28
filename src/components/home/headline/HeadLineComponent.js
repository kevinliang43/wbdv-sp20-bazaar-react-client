import React from "react";
import "./HeadLineComponent.css"

const HeadLineComponent = () => 

    <div class="py-5">
        {// Credit for Hover Effects:
         // https://bootstrapious.com/p/bootstrap-image-hover
        }
        <div class="row">

            <div class="col-lg-6 mb-3 mb-lg-0">
                <div class="hover hover-2 text-white rounded"><img src={"./images/headlineImages/brown-shopping-bags-5956.jpg"} alt=""/>
                    <div class="hover-overlay"></div>
                    <div class="hover-2-content px-5 py-4">
                        <h1 class="hover-2-title text-uppercase font-weight-bold mb-0"> <span class="font-weight-light">Your </span>Marketplace</h1>
                        <p class="hover-2-description text-uppercase mb-0">
                            Your one stop to buy and sell<br/><br/>
                            <a class="btn btn-outline-success " href="/register">Register Now</a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="hover hover-2 text-white rounded"> <img src={"./images/headlineImages/working-macbook-computer-keyboard-34577.jpg"} alt=""/>
                    <div class="hover-overlay"></div>
                    <div class="hover-2-content px-5 py-4">
                        <h1 class="hover-2-title text-uppercase font-weight-bold mb-0"> <span class="font-weight-light">Get </span>Started</h1>
                        <p class="hover-2-description text-uppercase mb-0">
                            Find what you've been looking for<br/><br/>
                            <a class="btn btn-outline-success navbar-dark" href="/search">Search</a>
                        </p>                
                    </div>
                </div>
            </div>
            
        </div>
    </div>


export default HeadLineComponent