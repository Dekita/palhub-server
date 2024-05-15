#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

source ./launcher/functions.sh
log_current_file
stop_containers
sleep 1 # small wait

# !: VALIDATE:
# update_repo

sleep 1 # small wait
rebuild_containers
