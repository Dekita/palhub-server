#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

source ./launcher/functions.sh
log_current_file
stop_containers
sleep 2 # small wait
start_containers
