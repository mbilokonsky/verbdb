const immutable_history = []

module.exports = (_config, object_cache) => {
  object_cache.initialize(immutable_history)

  const write = event => {
      immutable_history.push(event)
      object_cache.integrate(event)
  }

  const read = (key, schema) => {
      return object_cache.query(key, schema)
  }

  return { read, write }
}