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

// both calls have their correct typings attached
e.addEventListener('example-c', (ev) => console.log(ev.data));
e.dispatch('example-c', {data: 12});

e.on('example-a', () => { });