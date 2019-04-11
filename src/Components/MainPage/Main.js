import React, { Component } from "react"
import "./Main.css"

import NavBar from "../NavBar/NavBar"

export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar
                    {...this.props} />

                {/* Shows the enter brackit button if the user is authenticated and arrives at the landing page */}
                {/* Shows the Login button if the user is not authenticated */}
                <div className="MainPage">
                    {this.props.auth.isAuthenticated() &&
                        <a href="/secret">
                            <div className="MainPageButton">
                                <div className="MainPageButtonText">
                                    Enter Brackit
                            </div>
                            </div>
                        </a>
                    }
                    {!this.props.auth.isAuthenticated() &&
                        <div className="MainPageButton"
                            onClick={this.props.auth.login}>
                            <div className="MainPageButtonText">
                                Login
                            </div>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}