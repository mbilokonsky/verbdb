/*
    a SCHEMA is a recursive structure.

    Think of it as a function(node) that specifies (1) which properties of `node` to include in the output, and (2) what schema to apply to those downstream nodes.

    In our system any time a target is specified using a pointer format (like ":myk") we interpret that not as a string but rather as a reference to a node with the key ":myk".

    This means that target pointers can be looked up and "resolved" into structured objects themselves.

    The challenge is, how do you avoid returning complex recursive nested structures?

    The answer is, like GraphQL, you require your schema to terminate every branch at a static value eventually.

    Now to implement this...

*/

// a SCHEMA is a set of EDGE NAMES with associated SCHEMAS for each EDGE NAME

// Person(id:string) {
//     friends: Person[],
//     phone_number: string,
//     employer: Company
// }

// Company(id:string) {
//     name: string
// }


const buildEdge = () => {
    // return { context, label, resolve }
}

const applySchema = (schema, entity) => {
    return schema.edges.map(edge => {
        entity[edge.context] = edge.resolve(entity[edge.label])
    })
}

const hydrateSchema = edges_and_schemas => {
    { 
        edges: edges_and_schemas.map(({edge, schema}, store) => {
            
        })
    }
}



module.exports = {
    hyndrateSchema: (schema, store) => {
        schema.edges = schema.available_edges.map(({ context, label, schema }) => {
            const resolver = (label, store) => {
                return values => values.map(v => {

                })
            }

            return { context, label, resolver }
        })
    },
    applySchema: (entity, schema, store) => {
        return schema.available_edges.reduce((acc, edge) => {
            const { context, label, resolver } = edge
            const values = acc[context]
            acc[context] = resolver(label, store)(values)

            return acc
        }, entity)
    }
}