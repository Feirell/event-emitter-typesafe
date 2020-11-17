import {EventEmitterInt} from "./event-emitter-int";

const LISTENERS = Symbol('LISTENERS');

interface ListenerBacking {
    [key: string]: ((event: object) => void)[]
}

const ensureBacking = (target: object) => {
    const pd = Object.getOwnPropertyDescriptor(target, LISTENERS);

    if (pd === undefined) {
        const backing = Object.create(null);
        Object.defineProperty(target, LISTENERS, {
            value: backing,
            configurable: false,
            enumerable: false,
            writable: false
        });

        return backing as ListenerBacking;
    } else
        return pd.value as ListenerBacking;
}

const getListeners = (target: object, name: string | number | symbol) => {
    const backing = ensureBacking(target);
    return name in backing ? backing[name as any] : backing[name as any] = [];
}

export class EventEmitter<Events extends object> implements EventEmitterInt<Events> {
    // ensureBacking & getListeners are not part of this class to keep the prototype as expected

    addEventListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void) {
        const listeners = getListeners(this, name);
        listeners.push(listener as any);
    }

    // alias

    on<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void { }
    addListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void { }
    subscribe<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void { }

    once<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void) {
        const listenerWrapper = (ev: Events[Name]) => {
            this.removeEventListener(name, listenerWrapper);
            listener(ev);
        }

        this.addEventListener(name, listenerWrapper);
    }

    waitFor<Name extends keyof Events>(name: Name): Promise<Events[Name]> {
        return new Promise(res => this.once(name, res))
    }

    emit<Name extends keyof Events>(name: Name, event: Events[Name]) {
        const listeners = getListeners(this, name);

        // slicing to prevent issue with listener which manipulate the listener array
        for (const listener of listeners.slice())
            listener.call(this, event as any);
    }

    // alias

    dispatch<Name extends keyof Events>(name: Name, event: Events[Name]) { }
    push<Name extends keyof Events>(name: Name, event: Events[Name]) { }
    publish<Name extends keyof Events>(name: Name, event: Events[Name]) { }

    removeEventListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void) {
        const listeners = getListeners(this, name);
        const index = listeners.indexOf(listener as any);
        if (index == -1)
            return false;

        listeners.splice(index, 1);
        return true;
    }

    // alias

    off<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void) { return false; }
    removeListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void) { return false; }
    unsubscribe<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void) { return false; }
}

// setting alias functions

EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.addEventListener;
EventEmitter.prototype.subscribe = EventEmitter.prototype.addEventListener;

EventEmitter.prototype.dispatch = EventEmitter.prototype.emit;
EventEmitter.prototype.push = EventEmitter.prototype.dispatch;
EventEmitter.prototype.publish = EventEmitter.prototype.dispatch;

EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;
EventEmitter.prototype.removeListener = EventEmitter.prototype.removeEventListener;
EventEmitter.prototype.unsubscribe = EventEmitter.prototype.removeEventListener;