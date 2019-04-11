import React, { Component } from 'react'
import { Link } from "react-router-dom"

class ListCard extends Component {
    render() {
        let list = this.props.list
        let listItems = this.props.usersListItems.filter(item => item.listId === list.id)
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}

export default ListCard