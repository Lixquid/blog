---
title: Git Config Scopes
date: 2018/09/24
tags:
    - git
---

Git supports multiple scopes for setting configuration options:

- System-wide configuration (`/etc/gitconfig`)
- User-wide configuration (`~/.config/git/config` and `~/.gitconfig`)
- Repository configuration (`.git/config`)

More specified scopes trump less specific scopes. For example, a value set in
`~/.gitconfig` will overwrite a value in `/etc/gitconfig`.

Typically, the configuration options kept in each file are fairly disjoint.
For example, user identity is kept in the user's config, and branch remote
information is kept in the repository's config. However, all configuration
options are valid across all scopes!

## Repository specific identity

One use of this is to have user identity information kept in the repository's
config file.

```ini title=.git/config
[user]
    name = My Name
    email = my.name@example.com
```

## And other options

This also works in reverse; you can configure a remote at the global
configuration level:

```ini title=~/.gitconfig
[remote "remotename"]
    url = ssh://git@127.0.0.1/gitrepo
```

```sh title=Shell
$ git init
Initialized empty Git repository in ...
$ git fetch remotename
remote: Counting objects...
```
