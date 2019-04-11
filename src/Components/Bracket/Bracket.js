import React, { Component } from "react"

import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import Footer from "../Footer/Footer"

export default class Bracket extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar
                    {...this.props} />
                <SideBar />
                <Footer />
            </React.Fragment>
        )
    }
}