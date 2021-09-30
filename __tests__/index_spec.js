const { createPointer, createEvent, createStore } = require("../index")

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

  const store = createStore(":myk", {})

  it("allows you to create a store", () => {
    expect(typeof store.writeEvent).toBe("function")
  })
  it("allows you to create an event", () => {
    const event1 = createTestEvent1()
    expect(event1.id).not.toBe(null)
  })
  it("allows you to query for state", () => {
    const event1 = createTestEvent1()
    const event2 = createTestEvent2()
    store.writeEvent(event1)
    store.writeEvent(event2)

    expect(store.submitQuery(":myk")).toStrictEqual({
      birthday: [new Date("1/22/1983").toISOString()],
      location: [":new york"]
    })
  })
})