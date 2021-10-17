const { createPointer, createEvent, createStore } = require("../../src/api")

describe("VerbDB Store", () => {

  const createTestMeta = (intent) => {
    return { creator_id: ":myk", transaction_id: Math.random(), intent: intent }
  }

  const createTestEvent1 = () => {
    pointers = [
      createPointer("person", ":myk", "birthday"),
      createPointer("date", new Date("1/22/1983").toISOString())
    ]

    return createEvent(createTestMeta("Set Myk's birthday"), pointers)
  }

  const createTestEvent2 = () => {
    pointers = [
      createPointer("person", ":myk", "location"),
      createPointer("city", ":new york", "citizens")
    ]

    return createEvent(createTestMeta("Set Myk's city"), pointers)
  }

  const store = createStore(":myk", require("../../src/data_stores")["memory"]({}, require("../../src/object_cache")()))

  it("allows you to create a store", () => {
    expect(typeof store.write).toBe("function")
  })
  it("allows you to create an event", () => {
    const event1 = createTestEvent1()
    expect(event1.id).not.toBe(null)
  })
  it("allows you to query for state", () => {
    const event1 = createTestEvent1()
    const event2 = createTestEvent2()
    store.write(event1)
    store.write(event2)

    expect(store.read(":myk")).toStrictEqual({
      birthday: [{_verb: event1.id, date: new Date("1/22/1983").toISOString()}],
      location: [{_verb: event2.id, city:":new york"}]
    })
  })
})