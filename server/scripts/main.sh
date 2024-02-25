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

# configure server launch settings and world configuration
# 'exposes' PALWORLD_SERVER_ARGS for use in this file
source /app/config.sh

# ensure ue4ss is installed and 'expose' UE4SS_LOG_PATH for use in this file
source /app/ue4ss.sh

# install game server and 'expose' PALWORLD_SERVER_EXE for use in this file 
source /app/steam.sh

# schedule various cron tasks
source /app/cronjobs.sh

# run main proton command to launch server
CMD="$PROTON run $PALWORLD_SERVER_EXE ${PALWORLD_SERVER_ARGS}"
log "info" "CMD: ${CMD}"
${CMD} & 

# if ue4ss is enabled, then stream its log output 
if [ "$PALWORLD_UE4SS" = true ]; then
    tail -f "$UE4SS_LOG_PATH" | tee "/app/logs/ue4ss.log" || die "Failed to tail the log file."
else
    log "warning" "Started server without ue4ss log tail."
fi

################################
# PalHUB by dekitarpg@gmail.com
################################
