---
title: "Never: The Ultimate Subtype"
date: 2023/10/16
tags:
    - type_theory
    - typescript
---

In most inheritance-based type systems, there's usually the concept of an
ultimate supertype; the one type that all other types inherit from, and can be
cast to. Java / Kotlin has `Object`, C# has `object`, TypeScript has `unknown`.

```
    Object
 ╭────┴────╮
Car      Animal
        ╭──┴──╮
       Dog   Cat
```

This makes sense; inheritance (in single-inheritance languages) is a tree, and
there's only one root. But what about the other end? What's the ultimate
subtype; the type that everything else can be cast _from_?

Well, really, it's nothing. It can never exist. The ultimate supertype declares
the contract that everything must implement, but the ultimate subtype must by
definition implement every contract that could possibly exist, which is
impossible. But just because it's impossible doesn't mean it's not useful to
model!

```
    Object
 ╭────┴────╮
Car      Animal
 │      ╭──┴──╮
 │     Dog   Cat
 ╰────┬─┴─────╯
    Never
```

---

It's actually quite easy to create functions that "return" this impossible
type; just don't let them return at all! The function that never returns can
hence never return a value that doesn't match the impossible type.

```ts title=TypeScript
// TypeScript calls the ultimate subtype "never".
function logAndFail(): never {
    console.log("Invariant foo was violated!");
    throw new Error("Invariant foo was violated!");
}

const a: never = logAndFail();
```

Because the `logAndFail` function never returns, `a` will never contain a
value; execution never reaches the point where `a` is assigned.

## Why

The ultimate subtype (which I'll call `never` for the rest of this post) is
useful for modeling invariants beyond what the type system can express. It's
also helpful for ergonomics; it's safe to be automatically put in places where
the type is unknown or irrelevant.

Here are a few examples of where it's useful:

### Identifying Unreachable Code

A simple example is detecting unreachable code. If you have a function that
only returns `never`, then you can be sure that the function will never
actually return, and the code after the call is unreachable.

```ts title=TypeScript
function fail(): never {
    throw new Error("This function never returns");
}

fail();
foo(); // Editor will warn that this code is unreachable
```

### Collapsing Union Types

For languages that support union types, `never` can be "collapsed" out of a
union type as a special case. Because a type union is meant to represent that a
value could be any of the given types, by definition, a value can never be
`never`; it's completely safe to remove it from the union.

```ts title=TypeScript
function fail(): never {
    throw new Error("This function never returns");
}

let a: string = Math.random() > 0.5 ? "foo" : fail();
```

The right hand side of the assignment is a union type of `string` and `never`,
but because having a value of `never` is impossible, the expression is
simplified to just `string`, which is safe to assign to `a`.

---

Different languages have different names for the ultimate subtype. Here's a
quick list:

- **TypeScript**: `never`
- **Kotlin**: `Nothing`
- **Rust**: `!` (Previously `Never`)
- **Swift**: `Never`

<!-- ### Always Valid Covariant Types

Some types that are covariant in their generic parameters don't always use
those parameters for every value. For example, an `Either<TLeft, TRight>` that
could contain a `TLeft` or a `TRight` won't use `TLeft` if it contains a
`TRight`, and an immutable list won't use its generic parameter if it's empty.

Functions or constructors that return these types can usually infer the "used"
generic types from the arguments, but the unused generic types need explicit
typing. -->
