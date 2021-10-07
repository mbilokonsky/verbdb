const immutable_history = []
const object_cache = {}

const write = event => {
    immutable_history.push(event)
    
    event.pointers.forEach((pointer) => {
      const { target, context } = pointer
      if (!context) { return }
      if (!object_cache[target]) { object_cache[target] = {} }

      values = event.pointers.filter(pointer => pointer.target != target).map(e => ({ value: e.target, $verb: event.id }))

      if (!object_cache[target][context]) { object_cache[target][context] = [] }
      object_cache[target][context].push(values[0])
    })
}

const read = query => {
    return object_cache[query]
}

module.exports = _config => ({ read, write })