## Blog Post Format

Posts are stored in folders of the format `YYYYMMDD-slug`, with the post itself
having a filename of `index.md`.

Posts start with a front-matter; three dashes, followed by a YAML block,
followed by three dashes.

Front-matter specification:

```yaml
title: >
    String. Mandatory.

    The human-friendly title for the post.
date: >
    ISO-8601 Date as a String. Mandatory.

    The date the post was first published.
edited: >
    ISO-8601 Date as a String. Optional.

    The date the post was last edited.
tags: >
    List of strings. Mandatory.

    The topics associated with the post.
description: >
    String. Optional.

    A short, two sentence or less description of the contents of the post.
hidden: >
    Boolean. Optional.

    If true, the post will not show up in the index or tag pages.
```

## Blog Post Formatting

Posts are formatted with markdown.

Note, Tip, and Warning callouts can be created by starting blockquotes with a
**strong** highlighted text of either `Note`, `Tip`, or `Warning`. A colon `:`
can optionally appear within the strong highlighting.

Codeblocks can have a title by adding `title=Name` after the language specifier.
Names with spaces can be used by wrapping in quotes: `title="My Name"`.

```c title=Name
int x = 0;
```

Codeblocks can have line numbers by adding `linenumber` after the language
specifier. Linenumbering can start on any arbitrary number by using
`linenumber=5`.

```c linenumber
int x = 0;
```

Codeblocks can have negative, cautionary, or positive styling attached by adding
`type=doesntcompile`, `type=errors`, `type=incorrect`, `type=badpractice`,
`type=dangerous`, or `type=correct` after the language specifier.

```c type=incorrect
int x = 0;
```

Codeblocks can have multiple properties by separating them with a space after
the language specifier.
