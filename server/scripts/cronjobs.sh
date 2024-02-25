#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################

# include logger helper
source /app/logger.sh

# schedule server backups with crontab
CRONARGS="${INTERNAL_PALWORLD_SERVER_DIR} ${WORLD_BACKUP_LIMIT}"
log "info" "[CRONARGS]: ${PALWORLD_BACKUP_TIMER} /app/backup.sh ${CRONARGS}"
if echo "${PALWORLD_BACKUP_TIMER} /app/backup.sh ${CRONARGS}" | crontab - ; then
    log "info" "[PALWORLD_BACKUP] Cron job added successfully"
else
    die "[PALWORLD_BACKUP] Error adding cron job"
fi

################################
# PalHUB by dekitarpg@gmail.com
################################
