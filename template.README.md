# event-emitter-typesafe

This package is meant to give you an easy to use way of defining the events an object can emit in two different ways,
both are typesafe with TypeScript.

## API

Have a look at the documentation 

## usage

### extending

The easiest way is to just extend the provided `EventEmitter`.

<!-- USEFILE: examples/example-extending.ts; str => str.replace(/\.\.\/src\/event-emitter/g,'event-emitter-typesafe') -->

### mixin

You can also use the second option which leverages TypeScript mixins which allows you to not add `EventEmitter` to the prototype chain.
This can be useful if you have a class already which needs to extend another class. Mixins results in pretty much the same types as extending does.

<!-- USEFILE: examples/example-mixin.ts; str => str.replace(/\.\.\/src\/event-emitter/g,'event-emitter-typesafe') -->

### standalone

You could always just create an instance of the `EventEmitter` instead of extending it.

## similar

The package [@servie/events](https://www.npmjs.com/package/@servie/events) is quite similar but does not provide a mixin option. 