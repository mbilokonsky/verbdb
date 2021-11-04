import { DataStore, ObjectCache, ObjectCacheConfig, Reference, Relationship, Schema } from "../types"

const fs = require('fs')

module.exports = (config:ObjectCacheConfig, object_cache:ObjectCache):DataStore => {

    const {creator_id, file_path} = config
   
    try {
        fs.writeFileSync(file_path + "/immutable.json", JSON.stringify([]))
    } catch (e) {
        console.warn("Attempted to initialize store that already exists")
    }

    const load_immutable_stream = () => JSON.parse(fs.readFileSync(file_path + "/immutable.json"))
    
    object_cache.initialize(load_immutable_stream())

    const write_event_to_immutable_stream = (e:Relationship) => {
        const new_immutable_stream = load_immutable_stream()
        new_immutable_stream.push(e)
        fs.writeFileSync(file_path + "/immutable.json", JSON.stringify(new_immutable_stream))
    }

    const update_object_cache = (event:Relationship) => {
        object_cache.integrate(event)
    }

    const read = (key:Reference, schema:Schema) => {
        return object_cache.query(key, schema)
    }

    const write = (event:Relationship) => {
        write_event_to_immutable_stream(event)
        update_object_cache(event)
    }

    return { read, write }
}