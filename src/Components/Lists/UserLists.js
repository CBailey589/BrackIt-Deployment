import React, { Component } from "react"

import NavBar from "../NavBar/NavBar"

export default class UserLists extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar
                    {...this.props} />
            </React.Fragment>
        )
    }
}