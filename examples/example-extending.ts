import {EventEmitter} from "../src/index";

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

// add, remove and emit have their correct typings attached
e.once('example-c', () => console.log('example c was emitted'));
e.addEventListener('example-c', (ev) => console.log(ev.data));

// the first and the second listener will be called
e.emit('example-c', {data: 12});

// only the second listener will be called since the other one detached itself
// dispatch is just an alias for emit
e.dispatch('example-c', {data: 42});

e.on('example-a', () => { });