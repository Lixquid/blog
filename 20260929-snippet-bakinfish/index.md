---
title: "Snippet: Backing Up Files in Fish"
date: "2026-09-29"
description: "A fish function for easily backing up files locally with an appended date."
tags:
    - fish
    - snippets
---

Welcome back to snippets, the series where I share small scripts or commands.
Since this snippet is for the Fish Shell, if you want it to be available
everywhere, open your fish config file at `~/.config/fish/config.fish`, and add
it there.

---

Today's snippet is a quick way to backup files and folders to a date marked
file. If you've seen my post about [Dating old files](/20231210-lifetip-dateoldfiles/), this should make it a lot easier!

In a nutshell, this function will copy (or optionally, move) a file to its same
name with the current date and a new `.bak` extension. For example:

```sh title=Shell
$ ls
myfile.txt
$ bak myfile.txt
Copied 'myfile.txt' to 'myfile.txt.20260929.bak'
$ ls
myfile.txt myfile.txt.20260929.bak
```

Pretty useful for keeping a quick temporary copy while you do something. If you
want more persistant or resilient history, I'd recommend a proper Version Control
System like Git.

```sh copy
function bak --description "Duplicates files, renaming while doing so"
    # Parse flags and arguments
    argparse 'h/help' 'm/move' -- $argv
    or return

    set usage "\
Usage: bak [-h|--help] [-m|--move] FILE [FILE ...]
Creates a backup copy of each specified FILE by appending the current date
in YYYYMMDD format and a .bak extension.

If a file with the target backup name already exists, a numeric suffix is added
to ensure uniqueness.

Options:
  -h, --help        Show this help message.
  -m, --move        Move the original file instead of copying it.

Example:
  # Creates myfile.txt.20240615.bak
  bak myfile.txt"

    if set -ql _flag_h
        echo $usage
        return 0
    end

    # Exit early if no arguments
    if test (count $argv) -eq 0
        echo "Error: No filenames provided" >&2
        echo $usage >&2
        return 2
    end

    # Store the datetime so every backed up file gets the same date if copies
    # take a long time
    set current_datetime (date +%Y%m%d)

    for filename in $argv
        # Check the file is valid
        if not test -e $filename
            echo "Warning: File '$filename' does not exist, skipping." >&2
            continue
        end

        # If a file already exists at foo.txt.1234.bak, add a number until we
        # don't see a file
        set backup_filename "$filename.$current_datetime"
        if test -e "$backup_filename.bak"
            set counter 1
            while test -e "$backup_filename.$counter.bak"
                set counter (math $counter + 1)
            end
            set backup_filename "$backup_filename.$counter"
        end

        # Move or copy the file
        if set -q _flag_m
            mv $filename "$backup_filename.bak"
            echo "Moved '$filename' to '$backup_filename.bak'"
        else
            cp -r $filename "$backup_filename.bak"
            echo "Copied '$filename' to '$backup_filename.bak'"
        end
    end
end
# Provide tab completion hints for the function's flags
complete -c bak -s h -l help -d "Show help message"
complete -c bak -s m -l move -d "Move the original file instead of copying it"
```
