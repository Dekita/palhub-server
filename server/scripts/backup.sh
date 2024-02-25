#!/bin/bash

# include logger helper
source /app/logger.sh

# get arg variables passed to script (passed from env variables)
INTERNAL_PALWORLD_SERVER_DIR=$1
WORLD_BACKUP_LIMIT=$2

# Log file path
LOG_FILE="/app/backups/world-backup.log"
log "info" "$(date)" $LOG_FILE
log "info" "RUNNING SERVER WORLD BACKUP!!" $LOG_FILE
log "info" "INTERNAL_PALWORLD_SERVER_DIR: ${INTERNAL_PALWORLD_SERVER_DIR}" $LOG_FILE
log "info" "WORLD_BACKUP_LIMIT: ${WORLD_BACKUP_LIMIT}" $LOG_FILE

# Dir NEEDS to match $INTERNAL_PALWORLD_SERVER_DIR, but that variable isnt
# available within this running script, so lets assume:..
SAVEGAMES_DIR="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Saved/SaveGames"
log "info" "SAVEGAMES_DIR: ${SAVEGAMES_DIR}" $LOG_FILE

# Generate timestamp for the current backup
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

BACKUP_DIR=/app/backups/world
BACKUP_FILE="${BACKUP_DIR}/${TIMESTAMP}.tgz"

# Ensure the backup directory exists, create it if not
mkdir -p "$BACKUP_DIR" || die "Failed to create directory: ${BACKUP_DIR}" $LOG_FILE

log "info" "backing up saved game data" $LOG_FILE
tar -czf ${BACKUP_FILE} ${SAVEGAMES_DIR} || die "Game World Backup Failed!!" $LOG_FILE


log "info" "removing overgrown backups" $LOG_FILE

# Limit the number of backups
current_backups=$(ls -1t "$BACKUP_DIR" | grep '[0-9]\{14\}\.tgz' | head -n "$WORLD_BACKUP_LIMIT")
# log "info" "current_backups: $current_backups" $LOG_FILE

for old_backup in $(ls -1t "$BACKUP_DIR" | grep '[0-9]\{14\}\.tgz' | tail -n +$((WORLD_BACKUP_LIMIT + 1))); do
    rm "$BACKUP_DIR/$old_backup" || die "Failed to remove old backup: $old_backup" $LOG_FILE
    log "info" "REMOVED BACKUP: ${BACKUP_DIR}/${old_backup}" $LOG_FILE
done

log "info" "Backup and cleanup completed successfully." $LOG_FILE


# backup_game_data() {
#     # Log file path
#     # local LOG_FILE="/app/backups/world-backup.log"
#     log "info" "RUNNING SERVER WORLD BACKUP!!"
    
#     local SAVEGAMES_DIR=${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Saved/SaveGames

#     # Generate timestamp for the current backup
#     local TIMESTAMP=$(date +"%Y%m%d%H%M%S")

#     local BACKUP_DIR=/app/backups/world
#     local BACKUP_FILE="${BACKUP_DIR}/${TIMESTAMP}.tgz"

#     # Ensure the backup directory exists, create it if not
#     mkdir -p "$BACKUP_DIR" || die "Failed to create directory: $BACKUP_DIR" 

#     log "info" "backing up saved game data"
#     tar -czf ${BACKUP_FILE} ${SAVEGAMES_DIR} || die "Game World Backup Failed!!"
    
#     # Limit the number of backups
#     local current_backups=$(ls -1t "$BACKUP_DIR" | grep '[0-9]\{14\}\.tgz' | head -n "$WORLD_BACKUP_LIMIT")
#     for old_backup in $(ls -1t "$BACKUP_DIR" | grep '[0-9]\{14\}\.tgz' | tail -n +$((WORLD_BACKUP_LIMIT + 1))); do
#         rm "$BACKUP_DIR/$old_backup" || die "Failed to remove old backup: ${old_backup}"
#     }
# }

# # call function on script execution
# backup_game_data
