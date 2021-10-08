const fs = require('fs')

module.exports = config => {
    const {creator_id, file_path} = config

    try {
        fs.writeFileSync(file_path + "/immutable.json", JSON.stringify([]))
    } catch (e) {
        console.warn("Attempted to initialize store that already exists")
    }

    try {
        fs.writeFileSync(file_path + "/object_hash.json", JSON.stringify({}))
    } catch(e) {
        console.log(e)
        console.warn("Attempted to initialzie an object cache that already exists.")
    }

    const load_immutable_stream = () => JSON.parse(fs.readFileSync(file_path + "/immutable.json"))
    const load_object_cache = () => JSON.parse(fs.readFileSync(file_path + "/object_hash.json"))

    const write_event_to_immutable_stream = e => {
        const new_immutable_stream = load_immutable_stream()
        new_immutable_stream.push(e)
        fs.writeFileSync(file_path + "/immutable.json", JSON.stringify(new_immutable_stream))
    }

    const update_object_cache = event => {
        const object_cache = load_object_cache()
        
        event.pointers.forEach((pointer) => {
            const { target, context } = pointer            
            if (!context) { return }
            if (!object_cache[target]) { object_cache[target] = {} }
      
            values = event.pointers.filter(pointer => pointer.target != target).map(e => ({ [e.label]: e.target, _verb: event.id }))
            values = values.reduce((acc, val) => {
              return {...acc, ...val}
            }, {})
            if (!object_cache[target][context]) { object_cache[target][context] = [] }
            object_cache[target][context].push(values)
          })
        
        fs.writeFileSync(file_path + "/object_hash.json", JSON.stringify(object_cache))
    }

    const read = key => {
        return load_object_cache()[key]
    }

    const write = event => {
        write_event_to_immutable_stream(event)
        update_object_cache(event)
    }

    return { read, write }
}