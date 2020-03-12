import React from "react";
import {Link} from "react-router-dom"

class ListComponent extends React.Component {

    render() {
        return (
            <li className="list-group-item" key={this.props.idx}>
                <span className="row">
                    <div className="col-3">
                        <img className="w-75 h-100" src={`https://images.craigslist.org/${this.props.listing.imagePaths[0]}_300x300.jpg`}></img>
                    </div>
                    <div className="col-9">
                        <div className ="d-flex w-100 justify-content-between">
                            <Link to={`/posts/${this.props.city}/${this.props.listing.pid}`}>
                                <h5>{this.props.listing.title}</h5>
                            </Link>
                            <small>{this.props.listing.date}</small>
                        </div>
                        <p className="mb-1">
                            Price: {this.props.listing.price}
                        </p>
                    </div>

                </span>

            </li>

        )
    }
}

export default ListComponent