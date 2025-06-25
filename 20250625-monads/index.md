---
title: Monads
date: 2025/06/25
hidden: true
---

Monads are weird spooky things that are used by languages that can't deal with
the fact that time moves forward in the real world, and mostly by people with
too much or too little body hair.

Ok, that interpretation may be slightly uncharitable, but by and large there's a
well known idiom that once you understand monads, you completely and utterly
lose the ability to explain them to anyone else; you will find yourself saying
words like "functor" and "commutative", and your friends will tire of you saying
"that's just a monad" to every problem they have.

I currently think I'm in the unique position of having a practical understanding
of what monads are and why they're useful with essentially none of the
theoretical understanding, which is either refreshing or hideously, depending on
your perspective.

Note that I'm going to be light on why monads are useful, and focus more on
demystifying what they are / showing some examples of them.

## What is a Monad?

A Monad is any type that can 1: convert a value into itself (sometimes known as
unit), and 2: can perform a flat map (sometimes known as bind).

This is an incredibly abstract definition, so to help visualize it, I'll be
using the example of a `Promise` in JavaScript. (This is sometimes known as a
Future in other languages.)

```ts
// 1 / Unit: We turn a "42" into a "Promise<42>"
const value: number = 42;
const promise: Promise<number> = Promise.resolve(value);

// 2 / Flat Map: We give a function that takes an "unwrapped" number (NOT a
// Promise<number>!!), and returns a new Promise
const functionInput = (unwrappedValue: number): Promise<string> => {
    return httpGet(`https://how-cool-is-my-integer.com/${unwrappedValue}`);
};
const newPromise: Promise<string> = promise.then(functionInput);
```

> I find Promises to be a good example of a Monad because it's immediately obvious why you can't just "use" the value inside the Promise directly; you have to wait for it to resolve (from whatever external source it may be coming from), which is why it needs a function that is called when the value is available.

And that's it! That's all a Monad is; a way to wrap it, and a way to (f)map it.

To help with some examples, here's some other very common Monads, and how they obey the same rules:

- **Maybe** / **Option**: A type that represents a value that may or may not exist.
    - 1 / Unit: `Option.some(42)` or `Option.none<number>()`
    - 2 / Flat Map: `Option.flatMap(num => Option.some(num + 1))`
        - If the option is `none`, the function is not called, and the result is also `none`.
- **Result** / **Either**: A type that represents a value that may be one of two types, often a success type or an error type.
    - 1 / Unit: `Result.ok(42)` or `Result.err("Error message")`
    - 2 / Flat Map: `Result.flatMap(num => Result.ok(num + 1))`
        - This has the type `flatMap(fn: (value: TSuccess) => Result<TChanged, TError>): Result<TChanged, TError>`
        - If the result is a success, the function is called, and the result is a new `Result` with the success type changed to the type returned by the function.
        - If the result is an error, the function is not called, and the result is the same error type.
- **List**: A type that represents a list of values.
    - 1 / Unit: `List.of(42)`
    - 2 / Flat Map: `List.flatMap(num => List.of(num + 1))`
        - This calls the function for each value in the list, and returns a new list with the results.

## Why do Monads Matter?

Ok, big deal, there's a lot of types that all have the same two functions. Why
should I care?

The reason that this is useful is that it allows us to write code that operates
on any of these types, and let us chain them together. For example, instead of needing syntactic sugar for handling multiple nested async values, or special syntax sugar for handling optional values, you can just use syntax that works for all of them.

```ts
async function dealWithPromises() {
    const value = await getValue();
    const result = await processValue(value);
    const isValid = await validateResult(result);
    return isValid;
}
// This is special syntax for:
function dealWithPromises() {
    return getValue()
        .then((value) => processValue(value))
        .then((result) => validateResult(result));
}

function dealWithOptionals() {
    return getValue()?.processValue()?.validateResult();
}
// This is special syntax for:
function dealWithOptionals() {
    return getValue()
        .ifNotUndefined((value) => value.processValue())
        .ifNotUndefined((result) => result.validateResult());
}
```

All of these functions can be written in a way that works for any Monad, that
implements the two functions we talked about earlier.

Haskell is a language that is heavily based on Monads, and has a lot of syntactic sugar just for them. One of them is the `do` notation, which allows you to write code that looks a lot like the first example, but works for any Monad. It looks like this:

```haskell
do
	value <- getValue
	result <- processValue value
	isValid <- validateResult result
	return isValid
```

This is still completely type-safe, but this can exist in a function that doesn't care what monad is returned by `getValue`, as long as it has the two functions we talked about earlier.

## Monads in Type Math

A type `TMonad` is a Monad if the following functions exist:

1. `(value: TValue) => TMonad<TValue>` (Unit)
2. `(monad: TMonad<TValue>, fn: (value: TValue) => TMonad<TChanged>) => TMonad<TChanged>` (Flat Map)
