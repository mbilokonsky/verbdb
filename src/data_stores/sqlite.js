const Database = require('better-sqlite3');

module.exports = (config, object_cache) => {
    const db = new Database(config.path, { verbose: console.log });
    db.prepare('CREATE TABLE Events(id varchar, event json)').run()
    
    object_cache.initialize(db.prepare("SELECT * FROM Events").all())

    const read = (key, schema) => {
        return object_cache.query(key, schema)
    }

    const write = event => {
        db.prepare('INSERT INTO Events (id, event) VALUES (?, ?)').run(event.id, JSON.stringify(event))
        object_cache.integrate(event)
    }

    return { read, write }
}