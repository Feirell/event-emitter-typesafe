export interface EventEmitterInt<Events extends object> {
    /**
     * Adds an listener which is synchronously called in order in which they were added. This listener will receive the
     * event given by the corresponding dispatch call.
     *
     * @category listener adding
     * @param name the name of the event (key in the Events generic argument)
     * @param listener the listener you want to attach to that event
     */
    addEventListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void;

    /**
     * Alias for {@link addEventListener}
     *
     * @category listener adding
     * @alias addEventListener
     * @param name the name of the event (key in the Events generic argument)
     * @param listener the listener you want to attach to that event
     */
    on<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void;

    /**
     * Alias for {@link addEventListener}
     *
     * @category listener adding
     * @alias addEventListener
     * @param name the name of the event (key in the Events generic argument)
     * @param listener the listener you want to attach to that event
     */
    addListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void;

    /**
     * Alias for {@link addEventListener}
     *
     * @category listener adding
     * @alias addEventListener
     * @param name the name of the event (key in the Events generic argument)
     * @param listener the listener you want to attach to that event
     */
    subscribe<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void;

    /**
     * This function attaches a listener which will be removed at its first call.
     *
     * @category listener adding
     * @param name the name of the event (key in the Events generic argument)
     * @param listener the listener you want to attach to that event
     */
    once<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): void

    /**
     * This methods returns a promise which will be resolved when the event is dispatched. The Promise resolves to the
     * event.
     *
     * @category listener adding
     * @param name
     */
    waitFor<Name extends keyof Events>(name: Name): Promise<Events[Name]>

    /**
     * This method calls all listeners registered on this event name with the event instance provided as argument.
     *
     * Be aware that this method does not handle thrown errors and other misbehaving listeners. The listeners will be
     * called synchronously in their order in which they were added.
     *
     * @category event dispatching
     * @param name
     * @param event
     */
    emit<Name extends keyof Events>(name: Name, event: Events[Name]): void;

    /**
     * Alias for {@link emit}
     *
     * @category event dispatching
     * @param name
     * @param event
     */
    dispatch<Name extends keyof Events>(name: Name, event: Events[Name]): void;

    /**
     * Alias for {@link emit}
     *
     * @category event dispatching
     * @param name
     * @param event
     */
    push<Name extends keyof Events>(name: Name, event: Events[Name]): void;

    /**
     * Alias for {@link emit}
     *
     * @category event dispatching
     * @param name
     * @param event
     */
    publish<Name extends keyof Events>(name: Name, event: Events[Name]): void;

    /**
     * Removes the given listener from the list of listeners for the given name.
     *
     * @category listener removing
     * @param name
     * @param listener
     */
    removeEventListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): boolean;

    /**
     * Alias for {@link removeEventListener}
     *
     * @category listener removing
     * @param name
     * @param listener
     */
    off<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): boolean;

    /**
     * Alias for {@link removeEventListener}
     *
     * @category listener removing
     * @param name
     * @param listener
     */
    removeListener<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): boolean;

    /**
     * Alias for {@link removeEventListener}
     *
     * @category listener removing
     * @param name
     * @param listener
     */
    unsubscribe<Name extends keyof Events>(name: Name, listener: (ev: Events[Name]) => void): boolean;
}