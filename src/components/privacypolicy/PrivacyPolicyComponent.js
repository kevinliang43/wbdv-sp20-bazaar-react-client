import React from "react";
import "./PrivacyPolicyComponent.css"

const PrivacyPolicyComponent = () =>
    <div className="row d-flex justify-content-center bg-dark">
        <div className="col-sm-6 col-10 text-center">
            <div className="text-white">
                <h1 className="display-2 mt-5">Privacy Policy</h1>
                <p>
                    This is the privacy policy page of Bazaar where we disclose to our users what
                    kind of data we collect from them, what it is being used for, how we are storing
                    it, and our ethical uses of it.
                </p>
                <hr className="border-color-white row"/>
            </div>

            <div className="text-white">
                <h3>What data do we collect?</h3>
                <p>
                    We collect the content, communications and other information you provide when
                    you use our Products, including when you sign up for an account, and create or
                    post listings. If you use our Products for purchases or other financial
                    transactions, we collect information about the purchase or transaction.
                    This includes payment information, such as your credit or debit card number and
                    other card information; other account and authentication information; and
                    billing, shipping and contact details. None of your billing information is
                    shared with anybody else and is just kept by us so that you do not need to
                    reenter this information every time you would like to make a transaction.
                    You have choices regarding the information we collect and how it's used by
                    adjusting your privacy settings.
                </p>
                <hr className="border-color-white row"/>
            </div>

            <div className="text-white">
                <h3>How do we use your data?</h3>
                <p>
                    We use location-related information-such as your current location,
                    where you live, to personalize and improve the relevance of the listings shown
                    to you. Location-related information can be based on things like precise device
                    location (if you've allowed us to collect it) or IP addresses. We use the
                    account information you have given us to build your profile into our system and
                    to identify you properly when you are logging into your own personal account.
                    We only display information that you have deemed to be public information to
                    anyone using our services such as your name, general location, and username.
                    We keep track of what kind of listings you are frequently viewing or your past
                    transactions so that next time you use our services we show you more relevant
                    listings based off of your history on your home page.
                </p>
                <hr className="border-color-white row"/>
            </div>

            <div className="text-white">
                <h3>How is your data stored?</h3>
                <p>
                    Bazaar stores all of the data that you the user has given us in our own
                    secure databases. We work hard to protect you from unauthorized
                    access, alteration, disclosure, or destruction of information we hold,
                    including: using encryption to keep your data private while in transit,
                    reviewing our information collection, storage, and processing practices,
                    including physical security measures, to prevent unauthorized access to
                    our systems, restricting access to personal information from our employees.
                </p>
                <hr className="border-color-white row"/>
            </div>

            <div className="text-white">
                <h3>Our Promise</h3>
                <p>
                    All of us at Bazaar promises the user that none of your private information will
                    be used for any "dark purposes" such as selling your billing information or
                    account password for our own personal gain. Each and every user should feel safe
                    and comfortable using our services as none of their private information is
                    misused or disclosed to anybody else. All of your private information stays safe
                    in our secure databases and will remain as so.
                </p>
            </div>
        </div>
    </div>

export default PrivacyPolicyComponent