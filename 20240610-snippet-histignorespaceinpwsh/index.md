---
title: "Snippet: HIST_IGNORE_SPACE in PowerShell"
date: 2024/06/10
tags:
    - snippets
    - powershell
---

Welcome back to snippets, the series where I share small scripts or commands.
As always, if you want the following change to be available everywhere, open
your profile file (`notepad $PROFILE`), and paste it in there.

---

Today's snippet is actually more of a configuration change than a script. In
zsh, there's a feature called `HIST_IGNORE_SPACE` that prevents commands from
being added to your history if they start with a space. This is useful for
commands that contain sensitive information, like passwords.

PowerShell doesn't have this feature built-in, and its history is actually a
little more complex than bourne-like shells, due to originally using built-in
commandlets, then switching to an originally community-contributed "PSReadLine"
module.

> **Note**: If you're using a somewhat recent version of PowerShell, the following snippet
> should work for you. You can check if you're using PSReadLine by running
> `Set-PSReadLineOption`, and seeing if you get an unrecognized command error
> or not.

---

On to the snippet!

```powershell
Set-PSReadLineOption -AddToHistoryHandler {
	param ([string] $line)
	return $line[0] -ne " "
}
```

This snippet is quite a bit simpler than other snippets, with only a couple of
elements to describe. The curly braces after the `-AddToHistoryHandler`
argument creates a script block (akin to a function), which takes a single
string parameter. We check if the first character of the line is a space; if it
is *not* a space, `$true` is returned, and the command is added to the history.

If you would prefer to have history forget a different pattern, you can change
the script block to return a boolean matching whichever pattern you'd like to
ignore.
