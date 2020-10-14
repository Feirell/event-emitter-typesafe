# event-emitter-typesafe

This package is meant to give you an easy to use way of defining an event emitter which is typesafe. Those definitions
can be either applied by mixin or by extension of the `EventEmitter` class. 

In either way those classes offer the three main methods `add`, `remove` and `dispatch` and several alias. The API
documentation is available at: https://feirell.github.io/event-emitter-typesafe/.

## usage

### extending

The easiest way is to just extend the provided `EventEmitter`.

<!-- USEFILE: examples/example-extending.ts; str => str.replace(/\.\.\/src\/index/g,'event-emitter-typesafe') -->

### mixin

You can also use the second option which leverages TypeScript mixins which allow you to provide the functionality off
the  `EventEmitter` without extending it. This can be useful if you already are extending another class.
Mixins results in pretty much the same type situation as you would have with extension.

<!-- USEFILE: examples/example-mixin.ts; str => str.replace(/\.\.\/src\/index/g,'event-emitter-typesafe') -->

### standalone

You could always just create an instance of the `EventEmitter` instead of extending it.

## similar

The package [@servie/events](https://www.npmjs.com/package/@servie/events) is quite similar but does not provide a mixin
option and some of the alias. 