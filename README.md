# event-emitter-typesafe

This package is meant to give you an easy to use way of defining the events an object can emit in two different ways,
both are typesafe with TypeScript.

## usage

### extending

The easiest way is to just extend the provided `EventEmitter`.

<!-- USEFILE: examples\example-extending.ts; str => str.replace(/\.\.\/src\/event-emitter/g,'event-emitter-typesafe') -->
``` ts
import {EventEmitter} from "event-emitter-typesafe";

// define all available events by their name and their structure
interface ExampleEvents {
    'example-a': { data: number },
    'example-b': { data: number },
    'example-c': { data: number },
    'example-d': { data: number }
}

// your class you want to extend to a event emitter
class Example extends EventEmitter<ExampleEvents> {}

const e = new Example();

// both calls have their correct typings attached
e.addEventListener('example-c', (ev) => console.log(ev.data));
e.dispatch('example-c', {data: 12});
```
*You can find this in `examples\example-extending.ts`*

### mixin

You can also use the second option which leverages TypeScript mixins which allows you to not add `EventEmitter` to the prototype chain.
This can be useful if you have a class already which needs to extend another class. Mixins results in pretty much the same types as extending does.

<!-- USEFILE: examples\example-mixin.ts; str => str.replace(/\.\.\/src\/event-emitter/g,'event-emitter-typesafe') -->
``` ts
import {EventEmitterDef, makeEventEmitter} from "event-emitter-typesafe";

class SomeOtherClass {}

// your class you want to extend to a event emitter but which also extends another class
class Example extends SomeOtherClass {}

// define all available events by their name and their structure
interface ExampleEvents {
    'example-a': { data: number },
    'example-b': { data: number },
    'example-c': { data: number },
    'example-d': { data: number }
}

// use a mixin to extend the type definition of the Example class
// typescript will add the event definitions to this class type definition
interface Example extends EventEmitterDef<ExampleEvents> {}

// actually add the implementation to the Example prototype
makeEventEmitter(Example);

// usage is transparent
const e = new Example();

// both calls have their correct typings attached
e.addEventListener('example-c', (ev) => console.log(ev.data));
e.dispatch('example-c', {data: 12});
```
*You can find this in `examples\example-mixin.ts`*

### standalone

You could always just create an instance of the `EventEmitter` instead of extending it.

## similar

The package [@servie/events](https://www.npmjs.com/package/@servie/events) is quite similar but does not provide a mixing option. 