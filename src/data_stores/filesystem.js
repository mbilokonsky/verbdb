const fs = require('fs')

module.exports = (config, object_cache) => {

    const {creator_id, file_path} = config
   
    try {
        fs.writeFileSync(file_path + "/immutable.json", JSON.stringify([]))
    } catch (e) {
        console.warn("Attempted to initialize store that already exists")
    }

    const load_immutable_stream = () => JSON.parse(fs.readFileSync(file_path + "/immutable.json"))
    
    object_cache.initialize(load_immutable_stream())

    const write_event_to_immutable_stream = e => {
        const new_immutable_stream = load_immutable_stream()
        new_immutable_stream.push(e)
        fs.writeFileSync(file_path + "/immutable.json", JSON.stringify(new_immutable_stream))
    }

    const update_object_cache = event => {
        object_cache.integrate(event)
    }

    const read = key => {
        return object_cache.query(key, {}) // {} is a placeholder for a schema
    }

    const write = event => {
        write_event_to_immutable_stream(event)
        update_object_cache(event)
    }

    return { read, write }
}