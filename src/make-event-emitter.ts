import {EventEmitter} from "./event-emitter";


const eventEmitterPrototypeDesc = Object.getOwnPropertyDescriptors(EventEmitter.prototype);
delete (eventEmitterPrototypeDesc as any).constructor;

/**
 * Attaches the methods defined in the {@link EventEmitter} prototype to the prototype of the target.
 * The reason to manipulate the prototype instead of making it extend the EventEmitter is to keep the prototype chain as
 * it was.
 *
 * @throws This function will throw an Error if a property with the same name was already present on the prototype of
 * the target.
 *
 * @param target To manipulate the prototype of.
 */
export function makeEventEmitter<K extends { new(...args: any[]): void }>(target: K) {
    // not extending but adding those methods since it is not trivial to splice a prototype chain
    const tp = target.prototype;

    const targetPrototypeDesc = Object.getOwnPropertyDescriptors(tp);

    for (const name in eventEmitterPrototypeDesc)
        if (name in targetPrototypeDesc)
            throw new Error(String(name) + ' was already present in the prototype of the target');

    Object.defineProperties(tp, eventEmitterPrototypeDesc);
}