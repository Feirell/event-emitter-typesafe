import {EventEmitterInt, makeEventEmitter} from "../src/index";

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