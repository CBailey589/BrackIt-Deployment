import Settings from "./Settings"

export default Object.create(null, {
    GETALL: {
        value: function () {
            return fetch(`${Settings.url}/${this.DBarray}`)
                .then(r => r.json())
        }
    },
    POST: {
        value: function (obj) {
            return fetch(`${Settings.url}/${this.DBarray}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(r => r.json())
        }
    },
    CUSTOMSEARCH: {
        value: function (searchString) {
            return fetch(`${Settings.url}/${this.DBarray}${searchString}`)
                .then(r => r.json())
        }
    }
})