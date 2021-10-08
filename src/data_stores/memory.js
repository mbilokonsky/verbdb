const immutable_history = []
const object_cache = {}

const write = event => {
    immutable_history.push(event)
    
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
}

const read = query => {
    return object_cache[query]
}

module.exports = _config => ({ read, write })