import Settings from "./Settings"

export default Object.create(null, {
    GETALL: {
        value: function () {
            return fetch(`${Settings.url}/${this.DBarray}`)
                .then(r => r.json())
        }
    }
})