#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

source ./launcher/functions.sh
log_current_file
stop_containers

# Add the following line to stop the overall process
echo "Stopped the PalHUB containers.. "
echo "The kore py server is still listening on 8080."
echo "Press CTRL+C to terminate the py server process!"
