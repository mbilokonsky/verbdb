const UUID = require("uuid")

const createPointer = (label, target, context) => ({
  target,
  context,
  label
})

const createPointersObject = pointers => pointers.reduce((acc, { target, context, label }) => {
  acc[label] = { target, context }
  return acc
}, {})

const createEvent = (meta, pointers) => ({
  id: UUID.v4(),
  timestamp: new Date().toISOString(),
  creator_id: meta.creator_id,
  transaction_id: meta.transaction_id,
  intent: meta.intent,
  pointers: createPointersObject(pointers)
})

const createStore = (creator_id, initial_state) => {
  const immutable_history = []
  const object_cache = initial_state

  const writeEvent = event => {
    immutable_history.push(event)
    const pointers = Object.keys(event.pointers).map(key => event.pointers[key])
    
    pointers.forEach((pointer) => {
      const { target, context } = pointer
      if (!context) { return }
      if (!object_cache[target]) { object_cache[target] = {} }

      values = pointers.filter(pointer => pointer.target != target).map(e => e.target)

      if (values.length == 1) {
        if (!object_cache[target][context]) { object_cache[target][context] = [] }
        object_cache[target][context].push(values[0])
      } else {
        // todo support for 3+ dimensional events
        console.log(values)
      }
    })
  }

  const submitQuery = key => object_cache[key]

  return {
    creator_id,
    writeEvent,
    submitQuery
  }
}

module.exports = {createStore, createEvent, createPointer}