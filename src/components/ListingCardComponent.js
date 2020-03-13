import React from "react";
import {Link} from "react-router-dom"
import './ListingCardComponent.css'

class ListingCardComponent extends React.Component {

    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3" styles={{width: '18rem'}}>
                <div className="card bg-light">


                <img className="card-img-top" 
                    src={`https://images.craigslist.org/${this.props.listing.imagePaths[0]}_300x300.jpg`}
                    alt='No Images Available'/>
                <div className="card-body">
                    <div className="card-title text-truncate">
                        <Link to={`/posts/${this.props.city}/${this.props.listing.pid}`}>
                            <h5>{this.props.listing.title}</h5>
                        </Link>
                        <h6 class="card-subtitle text-muted">Price: {this.props.listing.price}</h6>
                    </div>
                    <br/>
                </div>
                </div>
            </div>
        )
    }
}

export default ListingCardComponent