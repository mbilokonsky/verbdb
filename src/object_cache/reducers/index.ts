import { ObjectCache, Reference, ReifiedState, Relationship, VerbValue } from "../../types"

const validate = (target:VerbValue):string => {
    return target.toString()
}

module.exports = {
    core: (object_cache:ObjectCache, event:Relationship) => {
        event.pointers.forEach((pointer) => {
            const { target, context } = pointer
            if (!context) { return }
            const validTarget = validate(target)

            
            if (!object_cache[validTarget]) { object_cache[validTarget] = {} as ReifiedState }
            var values = event.pointers.filter(pointer => pointer.target != target).map(e => ({ [e.label]: e.target, _verb: event.id, _timestamp: event.timestamp })).reduce((acc, val) => {
                return {...acc, ...val}
            }, {})
            
            if (!object_cache[validTarget][context]) { object_cache[validTarget][context] = [] }
            object_cache[validTarget][context].push(values)
        })
        
        return object_cache
    }
}