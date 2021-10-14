const Database = require('better-sqlite3');

module.exports = config => {
    const db = new Database(config.path, { verbose: console.log });
    db.prepare('CREATE TABLE Events(id varchar, event json)').run()

    // This lookup right now is receiving a key like ":myk", not the UUID of an event.
    // We need a way to lookup events-by-targets, and then to reduce them.
    // I'm thinking an in-memory object cache along with every store, for now?
    // we can reconstitute it by dumping the store into memory and reducing.
    const read = key => {
        console.log("Looking up key:", key)
        const row = db.prepare("SELECT * FROM Events WHERE id LIKE ?").exec(key)
        console.dir(row)
        return row
    }

    const write = event => {
        db.prepare('INSERT INTO Events (id, event) VALUES (?, ?)').run(event.id, JSON.stringify(event))
    }

    return { read, write }
}