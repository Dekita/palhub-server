#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################
service cron start
chown -R steam:steam /app
exec gosu steam /app/main.sh
