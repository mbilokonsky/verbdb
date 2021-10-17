const reducer = require("./reducers").core
const apply_schema = (event, _schema) => event

module.exports = () => {
    let object_hash = {}

    const rebuild = events => object_hash = events.reduce(reducer, {})
    const append = event => object_hash = [event].reduce(reducer, object_hash)
    const append_many = events => object_hash = events.reduce(reducer, object_hash)
    const invalidate = valid_events => rebuild(valid_events)
    const query = (key, schema) => {
        return apply_schema(object_hash[key], schema)
    }

    return {
        initialize: events => rebuild(events),
        append,
        append_many,
        invalidate,
        query
    }
}