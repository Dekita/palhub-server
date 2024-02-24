#!/bin/bash

backup_game_data() {
    SAVEGAMES_DIR=/app/PalServer/Pal/Saved/SaveGames

    # Generate timestamp for the current backup
    TIMESTAMP=$(date +"%Y%m%d%H%M%S")

    BACKUP_DIR=/app/backups
    BACKUP_FILE="${BACKUP_DIR}/${TIMESTAMP}.tgz"

    echo "backing up saved game data" 
    tar -czf ${BACKUP_FILE} ${SAVEGAMES_DIR} || { 
        echo "Backup failed"; exit 1; 
    }

    # Limit the number of backups
    current_backups=$(ls -1t "${BACKUP_DIR}" | grep '[0-9]\{14\}\.tgz' | head -n "$WORLD_BACKUP_LIMIT")
    for old_backup in $(ls -1t "${BACKUP_DIR}" | grep '[0-9]\{14\}\.tgz' | tail -n +$((WORLD_BACKUP_LIMIT + 1))); do
        rm "${BACKUP_DIR}/${old_backup}" || { echo "Failed to remove old backup: ${old_backup}"; exit 1; }
    done    
}

# call function on script execution
backup_game_data
