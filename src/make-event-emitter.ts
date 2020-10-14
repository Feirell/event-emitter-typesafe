import {EventEmitter} from "./event-emitter";


const eventEmitterPrototypeDesc = Object.getOwnPropertyDescriptors(EventEmitter.prototype);
delete (eventEmitterPrototypeDesc as any).constructor;

export function makeEventEmitter<K extends { new(...args: any[]): void }>(target: K) {
    // not extending but adding those methods since it is not trivial to splice a prototype chain
    const tp = target.prototype;

    const targetPrototypeDesc = Object.getOwnPropertyDescriptors(tp);

    for (const name in eventEmitterPrototypeDesc)
        if (name in targetPrototypeDesc)
            throw new Error(String(name) + ' was already present in the prototype of the target');

    Object.defineProperties(tp, eventEmitterPrototypeDesc);
}