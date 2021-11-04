import { ObjectCache, Reference, ReifiedState, Relationship, Schema } from "../types"

const apply_schema = (event:Relationship, _schema:Schema) => event
const filters = require("./filters")
const reducers =  require("./reducers")

module.exports = (filter_type = "none", filter_value = "", reducer_type = "core"):ObjectCache => {
    let object_hash:ReifiedState = {}
    const reducer = reducers[reducer_type]
    const filter_function = filters[filter_type](filter_value)

    console.log("Filter function type: ", filter_type);
    console.log(filter_function.toString())

    const filtered_events = (events:Relationship[]) => events.filter(filter_function)
    const initialize = (events:Relationship[]) => rebuild(filtered_events(events))
    const rebuild = (events:Relationship[]) => object_hash = filtered_events(events).reduce(reducer, {})
    const integrate = (event:Relationship) => object_hash = filtered_events([event]).reduce(reducer, object_hash)
    const integrate_many = (events:Relationship[]) => object_hash = filtered_events(events).reduce(reducer, object_hash)
    const invalidate = (valid_events:Relationship[]) => rebuild(filtered_events(valid_events))

    const query = (key:Reference, _schema:Schema) => {
        return object_hash[key]
    }

    return {
        initialize,
        integrate,
        integrate_many,
        invalidate,
        query
    }
}