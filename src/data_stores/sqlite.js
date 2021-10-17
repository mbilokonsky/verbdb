const Database = require('better-sqlite3');
const object_cache_builder = require("../object_cache")

module.exports = config => {
    const db = new Database(config.path, { verbose: console.log });
    db.prepare('CREATE TABLE Events(id varchar, event json)').run()
    
    const object_cache = object_cache_builder();
    object_cache.initialize(db.prepare("SELECT * FROM Events").all())

    const read = key => {
        return object_cache.query(key, {}) // the {} is a schema object, TBI
    }

    const write = event => {
        db.prepare('INSERT INTO Events (id, event) VALUES (?, ?)').run(event.id, JSON.stringify(event))
        object_cache.append(event)
    }

    return { read, write }
}