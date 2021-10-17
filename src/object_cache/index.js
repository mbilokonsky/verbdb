const apply_schema = (event, _schema) => event
const filters = require("./filters")
const reducers =  require("./reducers")

module.exports = (filter_type = "none", filter_value = "", reducer_type = "core") => {
    let object_hash = {}
    const reducer = reducers[reducer_type]
    const filter_function = filters[filter_type](filter_value)

    console.log("Filter function type: ", filter_type);
    console.log(filter_function.toString())

    const filtered_events = events => events.filter(filter_function)
    const initialize = events => rebuild(filtered_events(events))
    const rebuild = events => object_hash = filtered_events(events).reduce(reducer, {})
    const integrate = event => object_hash = filtered_events([event]).reduce(reducer, object_hash)
    const integrate_many = events => object_hash = filtered_events(events).reduce(reducer, object_hash)
    const invalidate = valid_events => rebuild(filtered_events(valid_events))

    const query = (key, schema) => {
        return apply_schema(object_hash[key], schema)
    }

    return {
        initialize,
        integrate,
        integrate_many,
        invalidate,
        query
    }
}