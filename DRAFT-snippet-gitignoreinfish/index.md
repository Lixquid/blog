---
title: "Snippet: Creating a .gitignore file in Fish"
date: "9999-01-01"
description: "A post with a fish shell snippet for fetching language-specific `.gitignore` templates from GitHub."
tags:
    - fish
    - snippets
hidden: true
---

```sh copy
function gitignore --description "Fetches a .gitignore template from GitHub"
    argparse 'h/help' -- $argv
    or return

    set usage "\
Usage: gitignore [-h|--help] TEMPLATE
Fetch a .gitignore template from the GitHub gitignore repository and save it as
.gitignore.

Options:
  -h, --help        Show this help message.

Example:
  # Fetches Go.gitignore and saves to .gitignore
  gitignore Go"

    if set -ql _flag_h
        echo $usage
        return 0
    end

    if test (count $argv) -lt 1
        echo "Error: missing template name" >&2
        echo $usage >&2
        return 2
    end

    set template $argv[1]
    set url "https://raw.githubusercontent.com/github/gitignore/refs/heads/main/$template.gitignore"

    if type -q curl
        if curl -fsSL $url -o .gitignore
            echo ".gitignore created from $template"
            return 0
        else
            echo "Failed to fetch $url" >&2
            return 1
        end
    else if type -q wget
        if wget -qO .gitignore $url
            echo ".gitignore created from $template"
            return 0
        else
            echo "Failed to fetch $url" >&2
            return 1
        end
    else
        echo "Error: neither curl nor wget is available" >&2
        return 1
    end
end
complete -c gitignore -s h -l help -d "Show help message"
# TODO: Add completions for available gitignore templates
```
