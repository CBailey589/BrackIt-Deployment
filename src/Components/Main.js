import React, { Component } from "react"

export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <p className="App-intro">
                    Hello {this.props.name}
                    Do you want to go to the secret area? <a href="/secret">Click Here!</a>
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