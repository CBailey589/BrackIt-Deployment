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

    postNewList = () => {
        // creates a list object, posts it to the lists array in the database, and then adds that to the current users lists in state
        const listObj = {
            userId: parseInt(this.props.userId),
            listName: document.querySelector("#listName").value,
            listCategory: document.querySelector("#listCategory").value,
            listCreatedDateTime: Date.now(),
            listLastUsed: Date.now(),
        }
        return ListManager.POST(listObj)
            .then(newListObj => {
                const newState = this.state
                newState.usersLists.push(newListObj)
                this.setState(newState)
            })
    }

    deleteList = (listId) => {
        // deletes the specified listId from the database, then filters the current userslists array in state to be all lists except for the one that was just deleted, and resets state
        return ListManager.DELETE(listId)
            .then(() => {
                const newState = this.state
                let shortenedArray = newState.usersLists.filter(list => list.id !== listId)
                newState.usersLists = shortenedArray
                this.setState(newState)
            })
    }

    addNewListItem = (itemObj) => {
        //works the same as postNewList, but with a lit item instead of an entire list
        return ListItemManager.POST(itemObj)
            .then(postedObj => {
                let newState = this.state
                newState.usersListItems.push(postedObj)
                this.setState(newState)
            })
    }

    removeListItem = (item) => {
        // deletes an item from the database, repulls all list items that belong to the user, and resets usersListItems in state
        let newState = this.state
        let userId = parseInt(this.props.userId)
        return ListItemManager.DELETE(item.id)
            .then(() => ListItemManager.CUSTOMSEARCH(`?userId=${userId}`))
            .then(json => newState.usersListItems = json)
            .then(() => this.setState(newState))
            .then(() => document.querySelector(`#edit--${item.listId}`).click())
    }

    updateList = () => { }
    // updateList = (listObj) => {
    //     let newState = this.state
    //     return ListManager.PUT(listObj)
    //         .then(() => UserManager.CUSTOMSEARCH(`?id=${listObj.userId}&_embed=lists`))
    //         .then(json => newState.usersLists = json[0].lists)
    //         .then(() => ListManager.GETALL())
    //         .then(json => newState.globalLists = json)
    //         .then(() => this.setState(newState))
    // }

    chanteItemStatus = () => { }
    // changeItemStatus = (evt) => {
    //     let newState = this.state
    //     const checkboxId = parseInt(evt.target.id.split("--")[1])
    //     let userId = parseInt(sessionStorage.getItem("BrackItId"))
    //     if (evt.target.checked) {
    //         ListItemsManager.PATCH(checkboxId, "itemActive", true)
    //         .then(() => ListItemsManager.CUSTOMSEARCH(`?userId=${userId}`))
    //         .then(json => newState.usersListItems = json)
    //         .then(() => ListItemsManager.GETALL())
    //         .then(json => newState.globalListItems = json)
    //         .then(() => this.setState(newState))
    //     } else {
    //         ListItemsManager.PATCH(checkboxId, "itemActive", false)
    //         .then(() => ListItemsManager.CUSTOMSEARCH(`?userId=${userId}`))
    //         .then(json => newState.usersListItems = json)
    //         .then(() => ListItemsManager.GETALL())
    //         .then(json => newState.globalListItems = json)
    //         .then(() => this.setState(newState))
    //     }
    // }



    render() {
        return (
            <React.Fragment>
                <Route exact path="/profile" render={(props) => {
                    return <UserLists
                        {...this.props}
                        {...props}
                        usersLists={this.state.usersLists}
                        usersListItems={this.state.usersListItems}
                        changeItemStatus={this.changeItemStatus}
                        postNewList={this.postNewList}
                        deleteList={this.deleteList}
                        addNewListItem={this.addNewListItem}
                        removeListItem={this.removeListItem}
                        updateList={this.updateList} />
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