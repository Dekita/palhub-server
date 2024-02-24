#!/bin/bash

# File: ue4ss.sh

# Path to the UE4SS log file
UE4SS_LOG_PATH="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/UE4SS.log"

# Function to handle errors and exit
handle_ue4ss_error() {
    echo "[PALWORLD_UE4SS] Error: $1" >&2
    exit 1
}

install_ue4ss() {
    #  return unless allowed to install
    [ "$PALWORLD_UE4SS" = false ] && return 1
    # return unless ue4ss hasnt been installed already
    [ -f "$INTERNAL_PALWORLD_SERVER_DIR/Pal/Binaries/Win64/dwmapi.dll" ] && return 1

    echo "[PALWORLD_UE4SS] Installing UE4SS"
    # Download the zip file from the GitHub release
    wget -O /tmp/ue4ss.zip https://github.com/UE4SS-RE/RE-UE4SS/releases/download/v3.0.1/UE4SS_v3.0.1.zip
    # Extract the contents to the destination folder
    unzip /tmp/ue4ss.zip -d ${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/
    
    # Download the additional BPModLoaderMod file
    if [ "$TEMP_UE4SS_FIX" = true ]; then
        echo "[PALWORLD_UE4SS] Installing UE4SS Temp BPModloaderMod Fix!"
        BPModloaderPath=Mods/BPModLoaderMod/Scripts/main.lua
        BPModloaderFixURL=https://raw.githubusercontent.com/Okaetsu/RE-UE4SS/logicmod-temp-fix
        wget -O ${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/${BPModloaderPath} ${BPModloaderFixURL}/assets/${BPModloaderPath}
    fi

    # Remove the temporary zip file
    rm /tmp/ue4ss.zip    
}

# backup+clean ue4ss log file before run
backup_ue4ss_log() {
    #  return unless previous log file exists
    [ ! -f "$UE4SS_LOG_PATH" ] && return 1

    # Backup directory and limit
    UE4SS_BACKUP_DIR="/app/backups/ue4ss"

    # Generate timestamp for the current backup
    TIMESTAMP=$(date +"%Y%m%d%H%M%S")

    # Create a backup of the log file
    BACKUP_FILENAME="${UE4SS_BACKUP_DIR}/${TIMESTAMP}.log"
    # Ensure the backup directory exists, create it if not
    mkdir -p "$UE4SS_BACKUP_DIR" || handle_ue4ss_error "Failed to create backup directory: $UE4SS_BACKUP_DIR"
    # Create a backup of the log file
    cp "$UE4SS_LOG_PATH" "$BACKUP_FILENAME" || handle_ue4ss_error "Failed to create backup of the log file."

    # Clean the log file
    echo "" > "$UE4SS_LOG_PATH" || handle_ue4ss_error "Failed to clean the log file."

    # Limit the number of backups
    current_backups=$(ls -1t "$UE4SS_BACKUP_DIR" | grep '[0-9]\{14\}\.log' | head -n "$UE4SS_BACKUP_LIMIT")
    for old_backup in $(ls -1t "$UE4SS_BACKUP_DIR" | grep '[0-9]\{14\}\.log' | tail -n +$((UE4SS_BACKUP_LIMIT + 1))); do
        rm "$UE4SS_BACKUP_DIR/$old_backup" || handle_ue4ss_error "Failed to remove old backup: $old_backup"
    done
}

# Call functions to execute their logic when the script is sourced
install_ue4ss
backup_ue4ss_log