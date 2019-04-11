import APIManager from "../Utilities/APIManager"

const ListItemManager = Object.create(APIManager, {
    DBarray: {
        value: "listItems"
    }
})

export default ListItemManager