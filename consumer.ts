const CREATOR_ID = ":myk"
const verbDB = require("./src/index")

const store = verbDB.store.create({
    creator_id: CREATOR_ID,
    store_type: "sqlite",
    file_path: "./data.db",
    filter_type: "none",
    filter_value: "",
    reducer_type: "core"
})

const createEmploymentRelationship = (employer:string, employee:string, salary:number, intent:string) => {
    const pointers = [
        { target: employee, context: "employer" , label: "resource" },
        { target: employer, context: "employees", label: "institution" },
        { target: salary, context: null, label: "salary" }
    ]

    return verbDB.api.createEvent(CREATOR_ID, Math.random().toString(), intent, pointers)
}

const createMarriageRelationship = (spouse1:string, spouse2:string, intent:string) => {
    const pointers = [
        { label: 'spouse', target: spouse1, context: 'spouse' },
        { label: 'spouse', target: spouse2, context: 'spouse' }
    ]

    return verbDB.api.createEvent(CREATOR_ID, Math.random().toString(), intent, pointers)
}

const relationship = createEmploymentRelationship("Foo Company", ":myk", 1000000, "Hire myk to build a weird databaseamajig thing!")
const marriage = createMarriageRelationship(":myk", ":hannah", "to live happily ever after")

store.write(relationship)
store.write(marriage)

const myk = store.read(":myk")
console.dir(myk)