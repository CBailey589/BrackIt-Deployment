import React, { Component } from "react"
import { Route } from 'react-router-dom';

import UserLists from "./Lists/UserLists"
import Bracket from "./Bracket/Bracket"

import ListManager from "../Modules/ResourceManagers/ListManager"
import ListItemManager from "../Modules/ResourceManagers/ListItemManager"

class ApplicationViews extends Component {
    state = {
        usersLists: [],
        usersListItems: []
    }

    componentDidMount() {
        // when user gets to profile, this calls database and gets all lists/list items, then filters them by the users id and places them in state
        const newState = {}
        let userId = parseInt(this.props.userId)
        let prom1 = Promise.resolve(ListManager.GETALL())
            .then(array => {
                let usersLists = array.filter(list => list.userId === userId)
                newState.usersLists = usersLists
            })
        let prom2 = Promise.resolve(ListItemManager.GETALL())
            .then(array => {
                let usersListItems = array.filter(item => item.userId === userId)
                newState.usersListItems = usersListItems
            })
        Promise.all([prom1, prom2])
        .then(() => this.setState(newState))

    }



    render() {
        return (
            <React.Fragment>
                <Route exact path="/profile" render={(props) => {
                    return <UserLists
                        {...this.props}
                        {...props} />
                }} />
                <Route exact path="/bracket/:listId(\d+)" render={(props) => {
                    return <Bracket
                        {...this.props}
                        {...props} />
                }} />
            </React.Fragment>
        )
    }





    // render() {
    //     return (
    //         <React.Fragment>
    //             <NavBar {...this.props} />
    //             {/* <div>This is a secret area</div> */}
    //             <button onClick={this.props.auth.logout}>Logout</button>
    //         </React.Fragment>
    //     )
    // }
}
export default ApplicationViews