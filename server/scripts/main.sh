#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################

# include logger helper
source /app/logger.sh

# ensure scriptis running as steam user or die
[ "$(id -u)" != "1000" ] && die "script must run as steam"

# clear all previous log contents on container start:
clear_log_dir

# ensure ue4ss is installed and 'expose' UE4SS_LOG_PATH for use in this file
source /app/ue4ss.sh

# include the main game server script
# this automatically installs/updates the game server
source /app/server.sh

# schedule various cron tasks
source /app/cronjobs.sh

# run main proton command to launch the game server
# if ue4ss is enabled, then stream also its log output 
launch_server & tail_ue4ss_logs
