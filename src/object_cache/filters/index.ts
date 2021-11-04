import { Reference, Relationship } from "../../types";

const custom = (filter_function:Function) => (e:Relationship) => filter_function(e)

module.exports = {
    none: () => (_:any) => true,
    by_target: (target:Reference) => (e:Relationship) => e.pointers.some(p => p.target == target),
    by_context: (context:string) => (e:Relationship) => e.pointers.some(p => p.context == context),
    by_label: (label:string) => (e:Relationship) => e.pointers.some(p => p.label == label),
    custom
}