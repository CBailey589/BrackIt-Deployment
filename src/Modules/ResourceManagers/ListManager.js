import APIManager from "../Utilities/APIManager"

const ListManager= Object.create(APIManager, {
    DBarray: {
        value: "lists"
    }
})

export default ListManager