const data_stores = require(`./data_stores`)
const { createStore } = require("./api")

const create = (config) => {
    console.log("CONFIG:", config)
    const { creator_id, store_type, file_path } = config
    const data_store = data_stores[store_type](config)
    return createStore(creator_id, data_store)
}

module.exports = {
    create
}