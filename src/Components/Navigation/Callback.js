import React, {Component} from "react"
import Auth from "../../Auth/Auth"

export default class Callback extends Component {
    componentDidMount() {
        const auth = new Auth();
        auth.handleAuthentication();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    loading...
                </div>
            </React.Fragment>
        )
    }
}