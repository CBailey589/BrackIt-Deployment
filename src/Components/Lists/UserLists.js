import React, { Component } from "react"

import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import Footer from "../Footer/Footer"
import ListCard from "./ListCard"
import NewListModal from "../Modals/NewListModal"
import DeleteConfirmModal from "../Modals/DeleteConfirmModal"
import EditListModal from "../Modals/EditListModal"

import "./Lists.css"



export default class UserLists extends Component {
    state = {
        modalContent: []
    }

    clearModal = () => {
        // removes modal from screen
        const newState = this.state
        newState.modalContent = []
        this.setState(newState)
    }

    displayNewListModal = () => {
        // sets modalContent in state equal to the new list form
        const newState = {}

        let modalContent = <NewListModal
            clearModal={this.clearModal}
            postNewList={this.props.postNewList} />

        newState.modalContent = modalContent
        this.setState(newState)
    }

    displayDeleteConfirmModal = (listObj) => {
        // same as displayNewListModal but with the delete confirmation modal
        const newState = {}

        let modalContent = <DeleteConfirmModal
            listObj={listObj}
            clearModal={this.clearModal}
            deleteList={this.props.deleteList} />

        newState.modalContent = modalContent
        this.setState(newState)
    }

    displayEditListModal = (listObj) => {
        // same as displayNewListModal but with the list edit modal
        const newState = {}

        let modalContent = <EditListModal
            {...this.props}
            listObj={listObj}
            clearModal={this.clearModal}
            usersListItems={this.props.usersListItems}
            addNewListItem={this.props.addNewListItem}
            removeListItem={this.props.removeListItem}
            updateList={this.props.updateList} />

        newState.modalContent = modalContent
        this.setState(newState)
    }



    render() {
        return (
            <React.Fragment>
                <NavBar
                    {...this.props} />
                <SideBar />
                <Footer />

                <React.Fragment>
                    <section className="ListSection">
                        <div className="ListSectionHeader">
                            <button
                                onClick={() => this.displayNewListModal()}
                            >
                                Create a new list
                        </button>
                        </div>
                        <section className="ListCardHolder">
                            {
                                this.props.usersLists.map(list =>
                                    <div className="ListCardOuterBorder" key={`OuterBorder--${list.id}`}>
                                        <ListCard key={`list--${list.id}`}
                                            usersListItems={this.props.usersListItems}
                                            list={list}
                                            changeItemStatus={this.props.changeItemStatus}
                                            displayDeleteConfirmModal={this.displayDeleteConfirmModal}
                                            displayEditListModal={this.displayEditListModal}
                                            changeListPrivacySetting={this.props.changeListPrivacySetting} />
                                    </div>
                                )
                            }
                        </section>
                    </section>
                    <div className="Modal" id="Modal">
                        {this.state.modalContent}
                    </div>
                </React.Fragment>

            </React.Fragment>
        )
    }
}