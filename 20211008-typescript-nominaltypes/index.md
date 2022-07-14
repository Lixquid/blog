---
title: TypeScript Nominal Types
date: 2021/10/08
tags:
    - typescript
---

TypeScript has an excellent type system that works well with JavaScript, in large part due to it being a *Structural* type system; two types are equivalent if they're structured the same, regardless of what they're called.

```ts
type A = {a: number}
type B = {a: number}

let a: A = {a: 2}
const b: B = {a: 5}
a = b // A-OK!
```

This is opposed to *Nominal* type systems which identify their types solely by their name:

```java
class A { private int a; }
class B { private int a; }

class Program {
    void run() {
        A a = new A();
        B b = new B();
        a = b; // ERROR! Incompatible types
    }
}
```

However, nominal type systems do have their benefits. Let's say you're dealing with coordinates; Latitude & Longitude, and X & Y, both expressed as a tuple of numbers.

In base TypeScript, this is a problem; they're both just a 2-tuple of numbers, so they can freely passed to functions expecting the other type.

```ts
type LatLon = [number, number];
type XY = [number, number];

function fooLatLon(c: LatLon) {/* ... */}

const xyCoord: XY = [1, 2];
fooLatLon(xyCoord);
// Doesn't cause a compile error, causes big problems at runtime!
```

To fix this, we can emulate nominal typing by intersecting the type with a completely unique value, like a symbol.

```ts
// Base type
type Coord = [number, number];

// Nominal types
declare const LatLonGuard: unique symbol;
type LatLon = Coord & {[LatLonGuard]: true};

declare const XYGuard: unique symbol;
type XY = Coord & {[XYGuard]: true};

// Functions using the types
function fooAnyCoord(c: Coord) {/* ... */}
function fooXYCoord(c: XY) {/* ... */}
function fooLatLonCoord(c: LatLon) {/* ... */}

const latlonCoord = [20, 30] as LatLon;
const xyCoord = [1, 2] as XY;

fooAnyCoord(latlonCoord); // A-OK!
fooAnyCoord(xyCoord); // A-OK!
fooXYCoord(latlonCoord); // Compile error
fooXYCoord(xyCoord); // A-OK!
fooLatLonCoord(latlonCoord); // A-OK!
fooLatLonCoord(xyCoord); // Compile error
```

This has several benefits:
- It has no effect on the values: they still are just the base type with no runtime additions
- It has no runtime overhead: the guards are `declare`d which results in no generated values
- It's hygienic: there is no chance someone else will make a nominal type that collides with your nominal type
- It's composable: you can make types that satisfy multiple nominal names by intersecting them

## How does it work?

Feel free to skip any section you already know!

### `declare`

The `declare` statement is normally used to "forward declare" any values that will exist at runtime, outside of what TypeScript knows. An example of this would be an untyped JavaScript file; you can declare all the values it exports and their types.

It's also a good way to make TypeScript think there's a value there, even if there isn't. In this case, we use it to make TypeScript think there's a symbol `const` that we can intersect with, even though it won't actually exist at runtime.

### `unique symbol`

The `unique symbol` type is kind of special; it's not considered structurally equal to any other value of its type. It's the type of the values generated from `Symbol()` calls; completely distinct from each other.

This makes it perfect for values that need to be hygienic; there's no chance of another type made by anyone else colliding with the type of the value.

### Intersection Types

Intersection types are less well known than their counterpart Union types, but they operate in roughly the same way. A type is considered structurally equivalent to an intersection type if it's structurally equivalent to *all* of it's component types.

```ts
type MyType = {a: 1} & {b: 2}
const x: MyType = {a: 1, b: 2}
```

This makes it useful for specializing values by adding a discriminator, as a generic value can easily be specialized with a small intersecting value.
