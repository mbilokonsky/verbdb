const data_stores = require(`./data_stores`)
const api = require("./api")

type Config = {
    creator_id: string,
    store_type: string,
    filter_type: string,
    filter_value: string,
    reducer_type: string,
}

const create = (config:Config) => {
    console.log("CONFIG:", config)
    const { creator_id, store_type, filter_type, filter_value, reducer_type } = config
    const object_cache = require("./object_cache")(filter_type, filter_value, reducer_type)
    const data_store = data_stores[store_type](config, object_cache)
    return api.createStore(creator_id, data_store)
}

module.exports = {
    create
}