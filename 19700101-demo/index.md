---
title: Demo Post
date: 1970/01/01
hidden: true
tags:
  - demo
  - post
---

This is a demo post used for testing formatting and styling. It should not
appear via any of the normal navigation methods.

# Heading 1

Rerum aperiam aut aut eos. Et maxime repudiandae dolor vitae enim maxime doloribus quam. Molestiae nesciunt voluptas voluptas. Sint aut ea deserunt pariatur. Consequatur sit odit sint accusantium odit autem consequatur.

## Heading 2

Quasi culpa eius quia et aut quia accusamus. Inventore repudiandae ut occaecati suscipit omnis quos voluptatum dolor. Magnam ut iste quos culpa explicabo perferendis doloribus rerum. Explicabo facere ullam ut harum reprehenderit voluptatem ut et. Quasi ea illo consequuntur nesciunt omnis non.

### Heading 3

Sed aut magni nobis. Aspernatur eligendi expedita libero voluptas numquam ipsa nihil eum. Alias impedit occaecati nobis dolorem soluta sint totam dolores. Vel sed veritatis voluptatibus dolores voluptas provident id. Tempora reprehenderit omnis vero atque natus.

#### Heading 4

Et assumenda asperiores veritatis maxime quasi qui aut ut. Fugiat quae amet consequatur repudiandae omnis repudiandae expedita deleniti. Sed quia eligendi qui et accusantium. Esse tenetur ut eius sint iste ipsa quia. Et explicabo quae tenetur animi dolorem dignissimos ut in. Eos dolor excepturi optio.

##### Heading 5

Possimus necessitatibus vel nisi earum. Pariatur culpa asperiores provident ad quas quisquam. Quasi veniam perferendis at illo ex quia pariatur. Impedit quod consequatur maiores cum nisi reiciendis quia sed. Sunt fugit fugit cumque eos ducimus nam quisquam. Provident dolorem voluptatem ducimus aperiam aliquid adipisci sit modi.

###### Heading 6

Rerum veniam repellendus aut nihil reprehenderit. Voluptas sed est autem quos cum repellendus. Reiciendis quas animi cumque. Et animi quae voluptatem autem rerum fugit incidunt ducimus. Maxime ut odit et ratione suscipit temporibus. Ipsum consequatur dolorem esse perspiciatis dolore.

## Code

Inline `code` sections. `var foo = bar;`

```
Voluptatem magni illo voluptatem quas tempora in est. Dignissimos et veritatis
et vero voluptates fugiat beatae minima. Atque dolorum quia et iste accusantium
cum eos. Nam perferendis commodi ut. Deserunt laudantium in aperiam odit. Enim
minima ea amet voluptas omnis iure et.
```

```
Voluptatem magni illo voluptatem quas tempora in est. Dignissimos et veritatis et vero voluptates fugiat beatae minima. Atque dolorum quia et iste accusantium cum eos. Nam perferendis commodi ut. Deserunt laudantium in aperiam odit. Enim minima ea amet voluptas omnis iure et.
```

## Emphasis

Regular text.
This is *emphasised text*.
This is **strong text**.
This is both **_emphasised and strong text_**.

## Links

This is an [example link](https://example.com/).

This is an [example link with title](https://example.com/ "Example Title").

## Image

![Example Image](./image.png)

## Horizontal Rule

---

## Lists

- Unordered list item 1
- Unordered list item 2
  - Unordered list item 2.1
  - Unordered list item 2.2
    - Unordered list item 2.2.1
    - Unordered list item 2.2.2
  - Unordered list item 2.3
- Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
   1. Ordered list item 2.1
   2. Ordered list item 2.2
      1. Ordered list item 2.2.1
      2. Ordered list item 2.2.2
   3. Ordered list item 2.3
3. Ordered list item 3

## Blockquotes

> This is a blockquote.
>
> Debitis expedita deserunt expedita nam. Omnis sit aut quaerat qui.
> Repellendus omnis maiores aspernatur autem et et. Eos deserunt eos ducimus.
> Recusandae porro impedit adipisci quisquam dolores neque provident et.

# Extensions

## External Support

This is ~~strikethrough~~ text.

This contains :smile: emoji.

|   | Table | Column |
| - | ----- | ------ |
| 1 | 2     | 3      |
| 4 | 5     | 6      |

## Alerts

> **Note:** This is a note.

> **Tip:** This is a tip.

> **Warning:** This is a warning.

## Codeblocks

Base:

```
Voluptatem magni illo voluptatem quas tempora in
est. Dignissimos et veritatis et vero voluptates fugiat beatae
minima. Atque dolorum quia et iste accusantium cum eos. Nam
perferendis commodi ut. Deserunt laudantium in aperiam odit. Enim
minima ea amet voluptas omnis iure et.
```

With language:

```typescript
/**
 * This is a code block.
 * @param a A string.
 */
function example(a: string): number {
  console.log(`Hello, ${a}!`);
  // This is a comment.
  return 5 * 5;
}
```

With title:

```typescript title=hello
/**
 * This is a code block.
 * @param a A string.
 */
```

With line numbers:

```typescript linenumber
/**
 * This is a code block.
 * @param a A string.
 */
```

```typescript linenumber=20
/**
 * This is a code block.
 * @param a A string.
 */
```

Variants:

```typescript type=doesntcompile
variable foo = 2;
```

```typescript type=errors
throw new Error("This is an error.");
```

```typescript type=incorrect
function sum(a: number, b: number) {
    return a * b;
}
```

```typescript type=badpractice
String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}
```

```typescript type=dangerous
eval("alert('This is dangerous!')");
```

```typescript type=correct
function sum(a: number, b: number) {
    return a + b;
}
```

With everything:

```typescript title=hello linenumber=20 type=correct
/**
 * This is a code block.
 * @param a A string.
 */
```

## JavaScript

Loaded UI:

<div id="tool" class="interactive-container">Sorry, but this section needs JavaScript to function.</div>

No JavaScript:

<div class="interactive-container">Sorry, but this section needs JavaScript to function.</div>

<script src="./index.ts" defer type="module"></script>

## UI Elements

Buttons:

- <button>Button</button>
- <button disabled>Disabled</button>

Text Inputs:

- <input type="text" value="Text">
- <input type="text" value="Invalid" class="invalid">
- <input type="text" value="Disabled" disabled>

Checkboxes:

- <label><input type="checkbox" checked> Checkbox</label>
- <label><input type="checkbox" class="large"> Large Checkbox</label>

Radio Buttons:

- <label><input type="radio" name="radio" checked> Radio 1</label>
- <label><input type="radio" name="radio"> Radio 2</label>
