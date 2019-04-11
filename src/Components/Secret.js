import React, { Component } from "react"

export default class Secret extends Component {
    render() {
        return (
            <React.Fragment>
                <div>This is a secret area</div>
                <button onClick={this.props.auth.logout}>Logout</button>
            </React.Fragment>
        )
    }
}