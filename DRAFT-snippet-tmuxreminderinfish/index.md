---
title: "Snippet: Setting Up a tmux Reminder for ssh in fish"
date: "9999-01-01"
description: "A post with a small snippet to remind users sshing in to use tmux for the fish shell."
tags:
    - fish
    - snippets
    - ssh
hidden: true
---

Welcome back to snippets, where I detail useful little scripts or commands.
This snippet is for the fish shell, and to be useful needs to run at login, so
be sure to put it in your fish configuration file at
`~/.config/fish/config.fish`.

---

Today's snippet is a bit less general than usual. I spend a fair amount of time
sshing back to my main computer back home over a VPN via my phone or a remote
laptop. When I do so, I usually put myself in a tmux session so that I have
access to multiple tabs and a convenient buffer no matter what client I'm
using.

> **Note**: [tmux](https://tmux.app/) is a terminal multiplexer, similar to
> [Screen](https://www.gnu.org/software/screen/). Its main benefits are that it
> disconnects the running session from your terminal session, so random
> disconnects won't kill your running processes, and also allow you to have
> multiple running sessions from the same connection.

Of course, sometimes I forget, and get annoyed that a connection hiccup kills my
running task. Or, I forget that I already created a session, and create another
tmux session (then wonder what's still using up ports or resources). No longer!

This snippet living in my fish config will print a helpful reminder to tell me
to create a new tmux session if one doesn't exist, or to attach to it if an
existing one does exist.

```sh copy
# We only want to print the reminder if we're running an actual shell
if status is-interactive
    # Only print the reminder if we're SSH'd in
    if set -q SSH_CONNECTION
        if not set -q TMUX
            set_color --bold yellow
            if tmux has-session 2>/dev/null
                echo "💡 You have an existing tmux session. Consider: tmux attach"
            else
                echo "💡 No tmux session exists. Consider starting one: tmux new"
            end
            set_color normal
        end
    end
end
```

A simple reminder, but the bright yellow really sticks out and reminds me where
it matters.
