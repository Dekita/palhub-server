#!/bin/bash

# Function to handle errors and exit
die() {
    echo "[$0] Error: $1" >&2
    while [ 1 ]; do sleep 10;done
    # exit 1
}

# ensure scriptis running as steam user
if [ "$(id -u)" != "1000" ];then
    echo "script must run as steam"
    exit 1
fi

# configure server launch settings and world configuration
# 'exposes' PALWORLD_SERVER_ARGS for use in this file
source /app/config.sh

# ensure ue4ss is installed and 'expose' UE4SS_LOG_PATH for use in this file
source /app/ue4ss.sh

# install game server and 'expose' PALWORLD_SERVER_EXE for use in this file 
source /app/steam.sh

# schedule server backups with crontab
if echo "${PALWORLD_BACKUP_TIMER} /app/backup.sh" | crontab - ; then
    echo "[PALWORLD_BACKUP] Cron job added successfully"
else
    echo "[PALWORLD_BACKUP] Error adding cron job" >&2
    exit 1
fi

# run main proton command to launch server
CMD="$PROTON run $PALWORLD_SERVER_EXE ${PALWORLD_SERVER_ARGS}"
echo "CMD: ${CMD}"
${CMD} & 

# if ue4ss is enabled, then stream its log output 
if [ "$PALWORLD_UE4SS" = true ]; then
    tail -f "$UE4SS_LOG_PATH" || die "Failed to tail the log file."
else
    echo "Started server without ue4ss log tail."
fi
