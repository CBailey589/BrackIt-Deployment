import React, { Component } from "react"
import "./NavBar.css"

class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <div className="NavBarLogo">
                </div>
                <div className="HeaderWelcome">
                    Welcome {this.props.name}
                </div>
                {/* Only shows logout Button if login is authenticated */}
                {this.props.auth.isAuthenticated() &&
                <div className="NavBarLinks">
                    <button onClick={this.props.auth.logout}>
                        Logout
                    </button>
                </div>
                }
            </div>
        )
    }
}

export default NavBar