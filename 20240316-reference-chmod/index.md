---
title: "Reference: chmod syntax"
date: 2024/03/16
tags:
    - reference
---

> tl;dr: \[Special,\] User, Group, Other.
> 4 (**R**ead), 2 (**W**rite), 1 (e**X**ecute)
>
> Entity Operator Permission. `[ugoa]*?[+-=][rwx]*`

`chmod` is a command used to change the permissions of a file or directory in
unix-like systems. It manipulates the permissions number of a file or
directory, which acts as a bit mask for each individual permission.

> **Bit Mask**: As all numbers can be represented in binary, a bit mask is a
> number that compacts multiple boolean values into a single number. For
> example, the number 5 in binary is `101`, which can be used to represent
> three boolean values: `true`, `false`, `true`.

In its minimal form, the permissions number is a 9-length binary number, where
each 3 bits represent the permissions for a specific entity: the user, the
group, and others. The first bit in each group is the read permission, the
second is the write permission, and the third is the execute permission.

As an example, this is what read-write permissions for the user, read-only
permissions for the group and others, would look like in binary:

```
      U  G  O
     ╭─╮╭─╮╭─╮
     110100100
     │││││││││
User RWX││││││
Group   RWX│││
Other      RWX
```

To make this easier to read, most outputs will replace 0 and 1 with `-` and
the permission letter, respectively. For example, the above example would be
displayed as `rw-r--r--`.

---

Since binary is kind of verbose and hard to read, chmod accepts the permissions
number in octal form (0-7), with a digit for each entity. In simple terms, the
read permission adds `4`, the write permission adds `2`, and the execute
permission adds `1`. For example, read-write permissions for the user,
read-only permissions for the group and others, would be represented as `644`.

Here's a small tool to help you convert between the two:

<div id="interactive-octal" class="interactive-container">Sorry, but this tool needs JavaScript to function.</div>

<script src="./octal-tool.ts" type="module"></script>

---

In addition to directly setting the entire permissions number, `chmod` also
has a syntax to modify the permissions of a file or directory. This takes the
form of an optional set of entities, an operation to perform, and the
permissions to modify.

- The entities can be one of `u` (user), `g` (group), `o` (others), or `a`
  (all). Multiple entities can be combined by listing them together, for
  example `ug` or `go`. If no entities are specified, `a` is used (mostly; see
  note).
- The operation can be one of `+` (add), `-` (remove), or `=` (set).
- The permissions can be one of `r` (read), `w` (write), or `x` (execute). As
  with the entities, multiple permissions can be combined by listing them
  together, for example `rw` or `wx`.

> **NOTE**: Specifying no entity is nearly the same as specifying `a`, but the
> `umask` of the current shell is unchanged. The `umask` is the permissions
> number that is removed from newly created files by default, and usually
> doesn't need to be changed.

Here's a small tool to generate and parse the syntax:

<div id="interactive-symbol" class="interactive-container">Sorry, but this section needs JavaScript to function.</div>

<script src="./symbol-tool.ts" type="module"></script>
