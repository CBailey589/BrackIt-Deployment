import React, { Component } from "react"

import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import Footer from "../Footer/Footer"
import ListCard from "./ListCard"

import "./Lists.css"
// import ListCard from './ListCard';


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
                            onClick={() => this.displayNewListModal()}>
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