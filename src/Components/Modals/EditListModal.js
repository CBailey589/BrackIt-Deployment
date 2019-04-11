import React, { Component } from 'react'

class EditListModal extends Component {
    state = {
        listName: "",
        listCategory: "",
        itemText: "",
        listItems: []
    }

    handleFieldChange = evt => {
        if (evt.target.id === "itemText" && evt.target.value.length <= 22) {
            const newState = this.state
            newState[evt.target.id] = evt.target.value
            this.setState(newState)
        } else if (evt.target.id === "itemText" && evt.target.value.length > 22) {
            alert("Item entries must be 20 characters or less")
            document.querySelector("#itemText").value = this.state.itemText
        } else if (evt.target.id !== "itemText") {
            const newState = this.state
            newState[evt.target.id] = evt.target.value
            this.setState(newState)
        }
    }

    componentDidMount() {
        const newState = this.state
        newState.listName = this.props.listObj.listName
        newState.listCategory = this.props.listObj.listCategory
        newState.listItems = this.props.usersListItems.filter(item => item.listId === this.props.listObj.id)
        this.setState(newState)
    }

    render() {
        let listObj = this.props.listObj
        // let listItems = this.props.usersListItems.filter(item => item.listId === listObj.id)

        return (
            <React.Fragment>
                <div className="BehindModalCover"></div>
                <div className="EditListForm">
                    <div className="EditListName">
                        <label htmlFor="listName">List name:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="listName"
                            value={`${this.state.listName}`}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className="EditListCat">
                        <label htmlFor="listCategory">List Category:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="listCategory"
                            value={`${this.state.listCategory}`}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className="ListItems">
                        {
                            this.state.listItems.map((item, index) =>
                                <section key={`itemSection--${index + 1}`}
                                    className="ItemSection">
                                    <div key={`item--${index + 1}`}>
                                        {item.itemText}
                                    </div>
                                    <button
                                        id={`remove--${item.id}`}
                                        onClick={() => {
                                            this.props.removeListItem(item)
                                            let listItems = this.state.listItems
                                            let updatedListItems = listItems.filter(listItem => listItem.id !== item.id)
                                            this.setState({ listItems: updatedListItems })
                                        }}>
                                        remove
                                </button>
                                </section>
                            )
                        }
                    </div>
                    <div className="NewItem">
                        <label htmlFor="itemText">Item Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="itemText"
                            placeholder="enter item here"
                            onChange={this.handleFieldChange}
                        />
                        <button
                            onClick={() => {
                                let itemObj = {
                                    itemText: this.state.itemText,
                                    listId: listObj.id,
                                    itemActive: true,
                                    itemWeight: 0.5,
                                    userId: listObj.userId
                                }
                                this.props.addNewListItem(itemObj)
                                let listItems = this.state.listItems
                                listItems.push(itemObj)
                                this.setState({ listItems: listItems })
                                this.setState({ itemText: "" })
                                document.querySelector("#itemText").value = ""
                            }}>
                            Add
                        </button>
                        <div className="CharRemaining">
                            {22 - this.state.itemText.length}/22 characters remaining
                        </div>
                    </div>
                    <button className="SaveEditsButton"
                        id={`update--${listObj.id}`}
                        onClick={() => {
                            const updatedListObj = {
                                id: listObj.id,
                                userId: parseInt(this.props.userId),
                                listName: this.state.listName,
                                listCategory: this.state.listCategory,
                                listCreatedDateTime: listObj.listCreatedDateTime,
                                listLastUsed: Date.now(),
                                public: listObj.public,
                            }
                            this.props.updateList(updatedListObj)
                            this.props.clearModal()
                        }}>
                        Save Edits
                    </button>
                </div>
            </React.Fragment >
        )
    }
}

export default EditListModal