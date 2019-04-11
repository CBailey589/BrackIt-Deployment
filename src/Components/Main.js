import React, { Component } from "react"

import NavBar from "../Components/NavBar/NavBar"

export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar
                {...this.props}/>
                <p className="App-intro">
                    Hello {this.props.name}<br/>
                    Ready to start using BrackIt?
                    {/* <a href="/secret">Click Here!</a> */}
                </p>
                {!this.props.auth.isAuthenticated() &&
                <div>
                    <div>
                        Please login first
                    </div>
                    <button onClick={this.props.auth.login}>
                        Login
                    </button>
                </div>
                }
            </React.Fragment>
        )
    }
}