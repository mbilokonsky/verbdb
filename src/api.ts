import { idText } from "typescript";
import { DataStore, Pointer, Reference, Relationship, Schema, VerbValue } from "./types";

const UUID = require("uuid")
const types = require("./types")


const createPointer = (label:string, target:VerbValue, context: string):Pointer => ({
  target,
  context,
  label
})

const createEvent = (creator_id:Reference, transaction_id:Reference, intent:string, pointers:Pointer[]):Relationship => ({
  id: UUID.v4(),
  timestamp: new Date(),
  creator_id,
  transaction_id,
  intent,
  pointers
})

const createStore = (creator_id:Reference, data_store:DataStore) => {
  const write = (event:Relationship) => {
    return data_store.write(event)
  }

  const read = (key:Reference, schema:Schema = { id: "foo", edges: [] }) => {
    return data_store.read(key, schema)
  }

  return {
    creator_id,
    write,
    read
  }
}

module.exports = { createStore, createEvent, createPointer }