import React from "react";
import "./HomeComponent.css"
import NavBarComponent from "../NavBarComponent"

export default class HomeComponent extends React.Component {

    render() {
        return (
            <div className={`container-fluid`}>
                <NavBarComponent/>
                <h1>Home Component</h1>
            </div>
        )
    }
}