import Settings from "./Settings"

export default Object.create(null, {
    // GETONE: {
    //     value: function (id) {
    //         return fetch(`${Settings.url}/${this.DBarray}/${id}`)
    //             .then(r => r.json())
    //     }
    // },
    // GETALL: {
    //     value: function () {
    //         return fetch(`${Settings.url}/${this.DBarray}`)
    //             .then(r => r.json())
    //     }
    // },
    // DELETE: {
    //     value: function (id) {
    //         return fetch(`${Settings.url}/${this.DBarray}/${id}`,
    //             {
    //                 method: "DELETE"
    //             }).then(r => r.json())
    //     }
    // },
    // POST: {
    //     value: function (obj) {
    //         return fetch(`${Settings.url}/${this.DBarray}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(obj)
    //         }).then(r => r.json())
    //     }
    // },
    // PUT: {
    //     value: function (obj) {
    //         return fetch(`${Settings.url}/${this.DBarray}/${obj.id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(obj)
    //         }).then(r => r.json());
    //     }
    // },
    // PATCH: {
    //     value: function (id, key, value) {
    //         return fetch(`${Settings.url}/${this.DBarray}/${id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ [key]: value })
    //         }).then(r => r.json())
    //     }
    // },
    // MATCHLIKE: {
    //     value: function (arrayKey, searchVal) {
    //         return fetch(`${Settings.url}/${this.DBarray}?${arrayKey}_like=${searchVal}`)
    //             .then(r => r.json())
    //     }
    // },
    // CUSTOMSEARCH: {
    //     value: function (searchString) {
    //         return fetch(`${Settings.url}/${this.DBarray}${searchString}`)
    //             .then(r => r.json())
    //     }
    // },
    // GETALLBYUSER: {
    //     value: function (userId) {
    //         return fetch(`${Settings.url}/${this.DBarray}?userId=${userId}`)
    //     }
    // }
})