# event-emitter-typesafe

This package is meant to give you an easy to use way of defining an event emitter which is typesafe. Those definitions
can be either applied by mixin or by extension of the `EventEmitter` class. 

In either way those classes offer the three main methods `add`, `remove` and `dispatch` and several alias. The API
documentation is available at: https://feirell.github.io/event-emitter-typesafe/.

## usage

### extending

The easiest way is to just extend the provided `EventEmitter`.

<!-- USEFILE: examples\example-extending.ts; str => str.replace(/\.\.\/src\/index/g,'event-emitter-typesafe') -->
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
class Example extends EventEmitter<ExampleEvents> {
}

const e = new Example();

// both calls have their correct typings attached
e.addEventListener('example-c', (ev) => console.log(ev.data));
e.dispatch('example-c', {data: 12});

e.on('example-a', () => { });
```
*You can find this in `examples\example-extending.ts`*

### mixin

You can also use the second option which leverages TypeScript mixins which allow you to provide the functionality off
the  `EventEmitter` without extending it. This can be useful if you already are extending another class.
Mixins results in pretty much the same type situation as you would have with extension.

<!-- USEFILE: examples\example-mixin.ts; str => str.replace(/\.\.\/src\/index/g,'event-emitter-typesafe') -->
``` ts
import {EventEmitterInt, makeEventEmitter} from "event-emitter-typesafe";

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
interface Example extends EventEmitterInt<ExampleEvents> {}

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

The package [@servie/events](https://www.npmjs.com/package/@servie/events) is quite similar but does not provide a mixin
option and some of the alias. 