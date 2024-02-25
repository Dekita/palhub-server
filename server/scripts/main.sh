#!/bin/bash

# include logger helper
source /app/logger.sh

# ensure scriptis running as steam user or die
[ "$(id -u)" != "1000" ] && die "script must run as steam"

# configure server launch settings and world configuration
# 'exposes' PALWORLD_SERVER_ARGS for use in this file
source /app/config.sh

# ensure ue4ss is installed and 'expose' UE4SS_LOG_PATH for use in this file
source /app/ue4ss.sh

# install game server and 'expose' PALWORLD_SERVER_EXE for use in this file 
source /app/steam.sh

# # schedule server backups with crontab
# CRONARGS = "INTERNAL_PALWORLD_SERVER_DIR=${INTERNAL_PALWORLD_SERVER_DIR}"
# CRONARGS += " WORLD_BACKUP_LIMIT=${WORLD_BACKUP_LIMIT}"

CRONARGS="${INTERNAL_PALWORLD_SERVER_DIR} ${WORLD_BACKUP_LIMIT}"
log "info" "[CRONARGS]: ${PALWORLD_BACKUP_TIMER} /app/backup.sh ${CRONARGS}"

if echo "${PALWORLD_BACKUP_TIMER} /app/backup.sh ${CRONARGS}" | crontab - ; then
    log "info" "[PALWORLD_BACKUP] Cron job added successfully"
else
    die "[PALWORLD_BACKUP] Error adding cron job"
fi

# run main proton command to launch server
CMD="$PROTON run $PALWORLD_SERVER_EXE ${PALWORLD_SERVER_ARGS}"
log "info" "CMD: ${CMD}"
${CMD} & 

# if ue4ss is enabled, then stream its log output 
if [ "$PALWORLD_UE4SS" = true ]; then
    tail -f "$UE4SS_LOG_PATH" || die "Failed to tail the log file."
else
    log "warning" "Started server without ue4ss log tail."
fi
