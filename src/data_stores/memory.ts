import { ObjectCache, ObjectCacheConfig, Reference, Relationship, Schema } from "../types"

const immutable_history:Relationship[] = []

module.exports = (_config:ObjectCacheConfig, object_cache:ObjectCache) => {
  object_cache.initialize(immutable_history)

  const write = (event:Relationship) => {
      immutable_history.push(event)
      object_cache.integrate(event)
  }

  const read = (key:Reference, schema:Schema) => {
      return object_cache.query(key, schema)
  }

  return { read, write }
}