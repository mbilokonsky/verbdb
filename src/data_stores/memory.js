const object_cache_builder = require("../object_cache")

const immutable_history = []
const object_cache = object_cache_builder();
object_cache.initialize(immutable_history)

const write = event => {
    immutable_history.push(event)
    object_cache.integrate(event)
}

const read = query => {
    return object_cache.query(query, {}) // schema)
}

module.exports = _config => ({ read, write })