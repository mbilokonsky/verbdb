module.exports = {
    core: (object_cache, event) => {
        event.pointers.forEach((pointer) => {
            const { target, context } = pointer
            if (!context) { return }
            if (!object_cache[target]) { object_cache[target] = {} }
        
            values = event.pointers.filter(pointer => pointer.target != target).map(e => ({ [e.label]: e.target, _verb: event.id, _timestamp: event.timestamp }))
            values = values.reduce((acc, val) => {
            return {...acc, ...val}
            }, {})
            if (!object_cache[target][context]) { object_cache[target][context] = [] }
            object_cache[target][context].push(values)
        })
        
        return object_cache
    }
}