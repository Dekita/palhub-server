#!/bin/bash
service cron start
chown -R steam:steam /app
exec gosu steam /app/start.sh
