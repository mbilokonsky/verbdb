export type VerbValue = Relationship | ReifiedState | Reference | string | number | boolean

export type Reference = string // I want this to be more than it is. Technically this is any string starting with a colon.

export type Pointer = {
    target: VerbValue,
    context: string,
    label: string
}

export type Relationship = {
    id: string,
    timestamp: Date,
    creator_id: Reference,
    transaction_id: Reference,
    intent: string,
    pointers: Pointer[]
}

export type TypedEdge = {
    edgeName:string,
    schema: Schema | null
}

export type Schema = {
    id: string,
    edges: TypedEdge[]
}

export type TargetReference = {
    [label:string]: VerbValue
} | {}

export type ReifiedState = {
    [edgeName:string]: TargetReference[]
} | {}

export type ReifiedStateWrapper = {
    [key:string]:ReifiedState
}

export type ObjectCache = {
    initialize: (events:Relationship[]) => ReifiedState,
    integrate: (event:Relationship) => ReifiedState,
    integrate_many: (events:Relationship[]) => ReifiedState,
    invalidate: (events:Relationship[]) => ReifiedState,
    query: (key: Reference, schema: Schema) => ReifiedState
}

export type ObjectCacheConfig = {
    path?:string,
    file_path?:string,
    creator_id:Reference
}

export type DataStore = {
    read: (key: Reference, schema: Schema) => ReifiedState,
    write: (relationship: Relationship) => void
}