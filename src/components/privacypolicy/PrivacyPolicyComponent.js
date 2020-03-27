import React from "react";
import "./PrivacyPolicyComponent.css"

const PrivacyPolicyComponent = () =>
    <div class="row d-flex justify-content-center bg-dark">
        <div className="col-sm-6 col-10 text-center">
            <div className="text-white">
                <h1 className="display-2 mt-5">Privacy Policy</h1>
                <hr className="border-color-white row"/>
            </div>

            <div className="text-white">
                <p>
                    At Bazaar, we care about your privacy. Bazaar will not disclose any of the
                    information that you have provided. For your knowledge, the information that
                    Bazaar collects from you is: your username, your password, your email address,
                    your phone number, user content such as pictures or anything you provide from
                    listing posts, and your location. Bazaar promises that none of this
                    information will be given out to others or sold for any dark practices.
                    Bazaar hopes you continue to enjoy our services and remain a happy user of our
                    website.
                </p>
            </div>
        </div>
    </div>

export default PrivacyPolicyComponent