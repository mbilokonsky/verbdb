const UUID = require("uuid")

const createPointer = (label, target, context) => ({
  target,
  context,
  label
})

const createEvent = (meta, pointers) => ({
  id: UUID.v4(),
  timestamp: new Date().toISOString(),
  creator_id: meta.creator_id,
  transaction_id: meta.transaction_id,
  intent: meta.intent,
  pointers
})

const createStore = (creator_id, data_store) => {
  const write = event => {
    return data_store.write(event)
  }

  const read = (key, schema = {}) => {
    return data_store.read(key, schema)
  }

  return {
    creator_id,
    write,
    read
  }
}

module.exports = {createStore, createEvent, createPointer}