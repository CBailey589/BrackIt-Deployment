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
                newState.usersLists = newState.usersLists.filter(list => list.id !== listId)
                newState.usersListItems = newState.usersListItems.filter(item => item.listId !== listId)
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

    updateList = (listObj) => {
        // replaces the database object with the updated object (listObj), repulls all of the users lists, sets state, and re rendres
        let newState = this.state
        let userId = parseInt(this.props.userId)
        return ListManager.PUT(listObj)
            .then(() => ListManager.GETALL())
            .then(array => {
                let usersLists = array.filter(list => list.userId === userId)
                newState.usersLists = usersLists
            })
            .then(() => this.setState(newState))
    }


    changeItemStatus = (evt) => {
        // Checks to see if a checkbox is checked, and sets "itemActive" accordingly, then resets state to force a re render to show changes
        let newState = this.state
        const checkboxId = parseInt(evt.target.id.split("--")[1])
        let userId = parseInt(this.props.userId)
        if (evt.target.checked) {
            ListItemManager.PATCH(checkboxId, "itemActive", true)
                .then(() => ListItemManager.CUSTOMSEARCH(`?userId=${userId}`))
                .then(json => newState.usersListItems = json)
                .then(() => this.setState(newState))
        } else {
            ListItemManager.PATCH(checkboxId, "itemActive", false)
                .then(() => ListItemManager.CUSTOMSEARCH(`?userId=${userId}`))
                .then(json => newState.usersListItems = json)
                .then(() => this.setState(newState))
        }
    }



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
}
export default ApplicationViews