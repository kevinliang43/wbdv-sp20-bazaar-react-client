import React from "react";
import {Link} from "react-router-dom"

class ListComponent extends React.Component {

    render() {
        return (
            <li className="list-group-item" key={this.props.idx}>
                <span className="row">
                    <div className="col-4">
                        <img className="w-50" src={`https://images.craigslist.org/${this.props.listing.imagePath}_300x300.jpg`}></img>
                    </div>
                    <div className="col-8">
                        <div className ="d-flex w-100 justify-content-between">
                            <h4>{this.props.listing.title}</h4>
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