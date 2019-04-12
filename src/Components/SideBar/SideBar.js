import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./SideBar.css"

class SideBar extends Component {
    render() {
        return (
            <section className="SideBar">
                <Link className="NavLink" to="/profile">
                    <button className="SideBarLink"
                    >My Lists</button>
                </Link>
            </section>
        )
    }
}

export default SideBar