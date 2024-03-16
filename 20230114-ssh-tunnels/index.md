---
title: SSH Tunnels
date: 2023/01/14
edited: 2024/03/16
tags:
    - ssh
---

tl;dr:
```sh
ssh -fNTL <local port>:<target host>:<target port> <remote ssh server>
# Forward traffic from local port to target host's target port
ssh -fNTR <remote port>:<target host>:<target port> <remote ssh server>
# Forward traffic from remote port on ssh server to target host's target port
```

SSH is probably most commonly used for remotely controlling other computers,
but did you know you can also use its tunneling to send more than commands? You
can establish network tunnels that will forward network traffic to/from remote
servers; perfect if you want to access a machine on a closed local network via
a public facing machine!

There are two fundamental commands to establish tunnels; `-L` (local
forwarding) and `-R` (remote forwarding). Local forwarding forwards from *your
local to a remote*, remote forwarding forwards from *a remote to your local*.
Simple!

Ok, well, not really. Diagrams help the most with this, so I've included some
to try and break down exactly what the commands are doing.

Before we begin, establishing some terminology will help if you get lost in the
myriad of servers and targets:
- *Local*: The machine you're physically at; the one running the ssh client
- *Remote*: The machine you're ssh-ing into; the machine running `sshd`, and
  whose ssh port you can see from your local
- *Target*: The machine you're trying to get / grant access to; visible only to
  *either* the local or remote (depending on local or remote forwarding!)

```
Diagram Key:
╔════════════════════════════════════╗
║Network / Firewall ═════════════════║
║                                    ║
║ ┌────────────────────────────────┐ ║
║ │Machine ════════════════════════│ ║
║ │╭──────────────╮ ╭──────────────┴╮║
║ ││Port          │ │           Port│║
║ ││Hidden Service│ │Exposed Service│║
║ │╰──────────────╯ ╰──────────────┬╯║
║ └────────────────────────────────┘ ║
╚════════════════════════════════════╝
```

## `-L`: Local Forwarding

```
ssh -L <local port>:<target host>:<target port> <remote ssh server>
```

Local forwarding establishes a tunnel to the remote server, then instructs the
remote ssh to forward traffic to a target machine only the remote can see.

Some use cases for this:
- The target server only exposes the ssh port; you want to communicate with a
  port that's blocked by a firewall
- The target server is only on a local network with the remote; you want to
  access it from your local

In this example, the remote machine `10.10.10.1` has a service running on port
`443` that is blocked by a firewall. Port `8443` is bound to on the local
machine; any traffic sent to it is forwarded to the remote machine via ssh.
From there, `sshd` forwards that traffic to `localhost:443`.

```
┌───────┐      ┌───────────────┐
│You ═══│      │10.10.10.1 ════│
│       │      │      ╭───────╮│
│curl ───────▶X│      │443    ││
└───────┘      │      │Service││
               │      ╰───────╯│
               └───────────────┘

ssh -L 8443:localhost:443 10.10.10.1
┌────────┐     ┌───────────────┐
│You ════│     │10.10.10.1 ════│
│        │    ╭┴───╮           │
│curl ─╮ │  ┌─▶22  ├────────╮  │
│      ▼ │  │ │sshd│        │  │
│  ╭────╮│  │ ╰┬───╯  ╭─────▼─╮│
│  │8443├───┘  │      │443    ││
│  │ssh ││     │      │Service││
│  ╰────╯│     │      ╰───────╯│
└────────┘     └───────────────┘
```

In this example, there is a target server `10.10.10.2` that is running a
service on port `443`, but is on a closed network with the remote server
`10.10.10.1`. Here, port `8443` is bound on the local machine as before, and
traffic is forwarded to the remote server. In this case, `sshd` forwards the
traffic to the target server on port `443`.

```
ssh -L 8443:10.10.10.2:443 10.10.10.1
┌────────┐    ╔══════════════════════════════════╗
│You ════│    ║Closed Network ═══════════════════║
│        │    ║┌────────────┐      ┌────────────┐║
│curl ─╮ │    ║│10.10.10.1 ═│      │10.10.10.2 ═│║
│      ▼ │   ╭─┴──╮         │     ╭┴──────╮     │║
│  ╭────╮│ ┌─▶22  ├───────────────▶443    │     │║
│  │8443├──┘ │sshd│         │     │Service│     │║
│  │ssh ││   ╰─┬──╯         │     ╰┬──────╯     │║
│  ╰────╯│    ║└────────────┘      └────────────┘║
└────────┘    ╚══════════════════════════════════╝
```

## `-R`: Remote Forwarding

```
ssh -R <remote port>:<target host>:<target port> <remote ssh server>
```

Remote forwarding establishes a tunnel to the remote server, then instructs the
remote ssh to open a port and forward any traffic sent to it to the client.
From there, it's sent to its target.

While less commonly used than local forwarding, it still has its uses when
you're inside a closed environment and can't accept any incoming connections.
Some use cases:
- You're on a NAT-ed network like a home consumer network that doesn't allow
  any incoming connections, and want to expose a service
- You're within a closed network and want to grant access to a hidden server
  from a publicly accessible server.

In this example, you have a local service running on port `443` you want to
expose, but your local machine is inside a closed network that accepts no
incoming connections. First, a connection is made to the remote server
`10.10.10.1`, and told to expose port `8443` on the remote machine. Second,
with the outbound connection still active, any traffic sent to port `8443` on
the remote server is tunnelled back to the local machine, where ssh forwards it
to `localhost:443`.

```
ssh -R 9000:localhost:443 10.10.10.1
╔═════════════════╗
║Closed Network ══║
║                 ║         ┌─────────────┐
║ ┌──────────────┐║         │10.10.10.1 ══│
║ │You ═════════ │║         │             │
║ │ ╭───╮        │║        ╭┴─────┬ ─ ─ ─ ┴
║ │ │ssh├──────────────────▶22         8443│
║ │ ╰───╯        │║        │sshd  ├ ─ ─ ─ ┬
║ │              │║        ╰┬─────╯       │
║ │ ╭──────────╮ │║         └─────────────┘
║ │ │       443│ │║  "Please
║ │ │   Service│ │║  forward port
║ │ ╰──────────╯ │║  8443"
║ └──────────────┘║
╚═════════════════╝

╔══════════════════╗
║Closed Network ═══║
║                  ║        ┌─────────────┐
║ ┌──────────────┐ ║        │10.10.10.1 ══│
║ │You ══════════│ ║        │             │
║ │ ╭───╮        │ ║       ╭┴─────┬───────┴╮
║ │ │ssh◀──────────────────┤22         8443◀──── curl
║ │ ╰─┬─╯        │ ║       │sshd  ├───────┬╯
║ │   │          │ ║       ╰┬─────╯       │
║ │ ╭─▼────────╮ │ ║        └─────────────┘
║ │ │       443│ │ ║
║ │ │   Service│ │ ║
║ │ ╰──────────╯ │ ║
║ └──────────────┘ ║
╚══════════════════╝
```

In this example, your local machine is inside a closed network with the target
server `192.168.0.1` running a service on port `443`. You have no ssh access to
the target server, so instead you establish a remote forwarding connection to
the remote server `10.10.10.1` as before. This time, the traffic is forwarded
from port `8443` on the remote server to your local ssh client, when then sends
it on to the target machine.

```
ssh -R 9000:192.168.0.1:443 10.10.10.1
╔═══════════════════════════════════╗
║Closed Network ════════════════════║
║                                   ║   ┌─────────────┐
║ ┌──────────────┐  ┌──────────────┐║   │10.10.10.1 ══│
║ │192.168.0.1 ══│  │You ═════════ │║   │             │
║ │    ╭─────────┴╮ │╭───╮         │║  ╭┴─────┬ ─ ─ ─ ┴
║ │    │       443│ ││ssh├─────────────▶22         8443│
║ │    │   Service│ │╰───╯         │║  │sshd  ├ ─ ─ ─ ┬
║ │    ╰─────────┬╯ │              │║  ╰┬─────╯       │
║ └──────────────┘  └──────────────┘║   └─────────────┘
╚═══════════════════════════════════╝ "Please
                                      forward port
                                      8443"
╔═══════════════════════════════════╗
║Closed Network ════════════════════║
║                                   ║   ┌─────────────┐
║ ┌──────────────┐  ┌──────────────┐║   │10.10.10.1 ══│
║ │192.168.0.1 ══│  │You ══════════│║   │             │
║ │    ╭─────────┴╮ │╭───╮         │║  ╭┴─────┬───────┴╮
║ │    │       443◀──┤ssh◀─────────────┤22         8443◀──── curl
║ │    │   Service│ │╰───╯         │║  │sshd  ├───────┬╯
║ │    ╰─────────┬╯ │              │║  ╰┬─────╯       │
║ └──────────────┘  └──────────────┘║   └─────────────┘
╚═══════════════════════════════════╝
```

## Extra flags: `-f`, `-N`, `-T`

Some extra flags that are useful when using ssh as a tunnel:

- `-f`: Backgrounds ssh
  - Useful to avoid clogging up your terminal with an inoperable ssh session.
- `-N`: No remote commands
  - Stops ssh from bothering to set up command handling; appropriate if you
    just want to forward traffic.
- `-T`: Disable tty allocation
  - Since no commands are being sent, we don't need a pseudo-terminal
    allocated.

## Bonus Tip: Reusing an existing connection

If you've read my previous post on
[killing hung SSH sessions](../20200821-ssh-killinghungsessions), I talk about
escape sequences (tl;dr: <kbd>Enter</kbd>, <kbd>\~</kbd>, key). The escape
sequence &#x23CE;~C will open a mini ssh command console, which will allow you
to establish these forwarding tunnels using an existing ssh connection; no need
to open another terminal!

```
me@remote:~$ (Enter, ~, C)
ssh> -L 9000:localhost:443
Forwarding port.
```

These commands can be seen in `man ssh`, but for easy access:

- `-L <local port>:<target host>:<target port>`
  - Local forwarding
- `-R <remote port>:<target host>:<target port>`
  - Remote forwarding
- `-KL <local port>`
  - Kills a local forwarding connection
- `-KR <remote port>`
  - Kills a remote forwarding connection
