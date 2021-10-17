module.exports = {
    none: () => _ => true,
    by_target: target => e => e.pointers.some(p => p.target == target),
    by_context: context => e => e.pointers.some(p => p.context == context),
    by_label: label => e => e.pointers.some(p => p.label == label),
    custom: filter_function => e => filter_function(e)
}