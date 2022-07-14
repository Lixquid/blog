---
title: Killing a hung SSH Session
date: 2020/08/21
tags:
    - ssh
---

tl;dr: Press <kbd>Enter</kbd>, then <kbd>~</kbd>, then <kbd>.</kbd>.

Sometimes, ssh will hang with the remote not responding to control characters.
Ssh actually supports escape characters to send functions directly to the ssh
client, a list of which are available by running `man ssh`:

```
ESCAPE CHARACTERS
     When a pseudo-terminal has been requested, ssh supports a number of
     functions through the use of an escape character.

     A single tilde character can be sent as ~~ or by following the tilde by a
     character other than those described below.  The escape character must
     always follow a newline to be interpreted as special.  The escape character
     can be changed in configuration files using the EscapeChar configuration
     directive or on the command line by the -e option.

     The supported escapes (assuming the default ‘~’) are:

     ~.      Disconnect.

     ~^Z     Background ssh.

     ~#      List forwarded connections.

     ...and so on.
```

As it states, the escape sequence is a newline (pressing <kbd>Enter</kbd>),
followed by the escape character (defaults to <kbd>~</kbd>), followed by your
command. <kbd>.</kbd> will disconnect the ssh session, <kbd><kbd>Ctrl</kbd> +
<kbd>Z</kbd></kbd> will force the session to the background, and so on.
