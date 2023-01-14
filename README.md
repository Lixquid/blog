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
```
