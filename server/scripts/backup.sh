#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################

# include logger helper
source /app/logger.sh
source /app/helpers.sh

# get arg variables passed to script (passed from env variables)
INTERNAL_PALWORLD_SERVER_DIR=$1
WORLD_BACKUP_LIMIT=$2

backup_game_data() {
    log "info" "Running game world backup.."
    local world_save_dir="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Saved/SaveGames"
    backup_data "$world_save_dir" "/app/backups/world" "$WORLD_BACKUP_LIMIT" 
}

# call function on script execution
backup_game_data
