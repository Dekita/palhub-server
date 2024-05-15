#!/bin/sh

# # get arg variables passed to script (passed from env variables)
# PALHUB_ADMIN_USER=$1
# PALHUB_ADMIN_PASS=$2

# automatically rewrite the htpasswd for basic authentication
# based on the username and password set within .env 
# ~ can be configured within the admin dashboard, will only
#   take effect when system restarted if changed in admin dash. 
htpasswd -cb /etc/nginx/.htpasswd $PALHUB_ADMIN_USER $PALHUB_ADMIN_PASS

# start nginx
nginx -g "daemon off;"