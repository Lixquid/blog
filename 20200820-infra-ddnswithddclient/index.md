---
title: Dynamic DNS with DDClient, Cloudflare, and Docker
date: 2020/08/20
tags:
    - tutorial
---

## What's Dynamic DNS?

Dynamic DNS is a mechanism to automatically update DNS records with the
location of a device or system. Systems that have "floating" IP addresses
(such as most home consumer internet connections) need Dynamic DNS to have a
constantly addressable domain name.

## Configuration Steps

1. Get your Cloudflare Global API Key
   1. Head to https://cloudflare.com and log in
   2. In the profile drop-down in the top-right, select *My Profile*
   3. From the tabs at the top, select *API Tokens*
   4. Under *API Keys*, next to *Global API Key*, select *View*
   5. If required, re-enter your password / solve the CAPTCHA
   6. Copy down the Global API Key shown
2. On your server, get your user's UID and GID
   1. You can get your UID with `id -u username`
   2. You can get your GID with `id -g username`
3. On your server, create a new `ddclient` folder
   - The folder will be copied wholesale into the container, so you don't
     want too much garbage in it
4. In this folder, create a new `ddclient.conf` file, with the following
   contents:

   ```ini
   use=web, web=ipinfo.io/ip
   protocol=cloudflare, \
   zone=<your zone>, \
   login=<your cloudflare login email>, \
   password=<your global API key> \
   <DNS record to update>
   ```

   So, for example:

   ```ini
   use=web, web=ipinfo.io/ip
   protocol=cloudflare, \
   zone=example.com, \
   login=me@example.com, \
   password=e3199589b1476ebca5c8547f780da80843431 \
   server.example.com
   ```

   > **NOTE**: There is no comma after the `password` entry!

   > **WARNING**: The Global API key is essentially the same as your
   cloudflare password: Make sure you don't accidentally check it into source
   control!
5. Also in the folder, create a new `docker-compose.yml` file, with the
   following contents:

   ```yml
   version: "3.7"
   services:
     ddclient:
       image: linuxserver/ddclient
       container_name: ddclient
       environment:
         - PUID=<Your user's UID>
         - PGID=<Your user's GID>
         - TZ=<Your timezone>
       volumes:
         - .:/config
       restart: unless-stopped
   ```

   So, for example:

   ```yml
   version: "3.7"
   services:
     ddclient:
       image: linuxserver/ddclient
       container_name: ddclient
       environment:
         - PUID=1001
         - PGID=1001
         - TZ=Europe/London
       volumes:
         - .:/config
       restart: unless-stopped
   ```

6. Start the ddclient service
   1. In the folder, run `docker-compose up -d`
      - (You may need to run `sudo` beforehand.)

That's it! You should now have a functional ddclient instance creating and
updating a DNS `A` record in cloudflare DNS. The `restart` setting will
ensure the container restarts if the hosting server restarts.

If the record doesn't seem to be updating, you can check the logs of the
running container with `docker logs ddclient`.
