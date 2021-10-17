const data_stores = require(`./data_stores`)
const { createStore } = require("./api")

const create = (config) => {
    console.log("CONFIG:", config)
    const { creator_id, store_type, filter_type, filter_value, reducer_type } = config
    const object_cache = require("./object_cache")(filter_type, filter_value, reducer_type)
    const data_store = data_stores[store_type](config, object_cache)
    return createStore(creator_id, data_store)
}

module.exports = {
    create
}