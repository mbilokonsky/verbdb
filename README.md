# verbdb
A database that treats state as a side effect

# State as a WHAT?
VerbDB models the world as constantly changing. The idea that any state is an up-to-date representation of "reality" is nonsensical -- it's always a snapshot of a subsett of reality at some point in time.

VerbDB understands this, and so allows you to model change over time in a way that makes it easy to derive state from a snapshot at any time.

As a result you can do some pretty interesting things. 

  * Application development becomes largely a matter of creating and publishing events.
  * Queries can be highly granular, with schemas and filters applied at query time like a NoSQL database.
  * Relationships between nodes in your data domain are fully preserved, making all data in VerbDB _fully relational_.
  * Because VerbDB derives state from an immutable append-only log of events you can trivially shared your state, fork it, merge and otherwise treat it as a set of discrete claims about reality (because that's what it is).

There are also some idiosyncrasies it's worth being aware of.

  * All properties in a native VerbDB object resolve to arrays containing values. This is because there's no way to know in advance how many events are making concurrent claims about that `object.property`, and we have to support the idea that multiple irreconcilable claims exist.
  * This means that data reconcilliation is pushed to the edge and up to the consumer, rather than something done at write-time.
  * Reconcilliation strategies may include things like "Take the newest value", "Average all values", "Take the oldest value" or "Always trust values from Sally above all other values". It's entirely up to you, you'll just get the metadata you need to resolve state at point of query.

# FAQ

### Can you build real apps with this?
This is new, but the eventual intention is yes. Right now we don't have a persistence layer so for NOW the answer is no, not unless your app can exist purely in-memory, but we'll get there soon enough. Persistence is not as high a priority in a system like this as making sure that the events are properly flowing.

VerbDB is meant as a full replacement for your state store. All domain models should be VerbDB schemas. If you're using something like Redux you should extract domain data from your redux events and pass it into domain-specific `createXRelationship()` methods which are bound to the store. Then you can query the store for the data you want.

### This hurts my brain
I know but it's a good pain, right?
