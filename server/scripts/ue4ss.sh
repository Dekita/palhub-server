#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

# source /app/logger.sh
source /app/helpers.sh

# UE4SS_LOG_PATH: exposed to main.sh
# Contains the path to the UE4SS log file
UE4SS_LOG_PATH="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/UE4SS.log"

install_ue4ss() {
    #  return unless allowed to install
    [ "$PALWORLD_UE4SS" = false ] && return 1
    # return unless ue4ss hasnt been installed already
    [ -f "$INTERNAL_PALWORLD_SERVER_DIR/Pal/Binaries/Win64/dwmapi.dll" ] && return 1

    log "info" "[PALWORLD_UE4SS] Installing UE4SS"
    # Download the zip file from the GitHub release
    wget -O /tmp/ue4ss.zip https://github.com/UE4SS-RE/RE-UE4SS/releases/download/v${UE4SS_VERSION}/UE4SS_v${UE4SS_VERSION}.zip
    # Extract the contents to the destination folder
    unzip /tmp/ue4ss.zip -d ${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/
    
    # Download the additional BPModLoaderMod file
    if [ "$TEMP_UE4SS_FIX" = true ]; then
        log "info" "[PALWORLD_UE4SS] Installing UE4SS Temp BPModloaderMod Fix!"
        BPMODLOADER_PATH=Mods/BPModLoaderMod/Scripts/main.lua
        BPMODLOADER_FIXURL=https://raw.githubusercontent.com/Okaetsu/RE-UE4SS/logicmod-temp-fix
        wget -O ${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/${BPMODLOADER_PATH} ${BPMODLOADER_FIXURL}/assets/${BPMODLOADER_PATH}
    fi

    # Remove the temporary zip file
    rm /tmp/ue4ss.zip    
}

# backup+clean ue4ss log file before run
backup_ue4ss_log() {
    [ ! -f "$UE4SS_LOG_PATH" ] && return 1
    backup_data "$UE4SS_LOG_PATH" "/app/backups/ue4ss" "$UE4SS_BACKUP_LIMIT" 
    echo "" > "$UE4SS_LOG_PATH" || die "Failed to clean the log file."
}

tail_ue4ss_logs() {
    # if ue4ss is enabled, then stream its log output 
    if [ "$PALWORLD_UE4SS" = true ]; then
        tail -f "$UE4SS_LOG_PATH" | tee "/app/logs/ue4ss.log" || die "Failed to tail the log file."
    else
        log "warning" "Starting server without ue4ss installed!"
    fi
}

# Call functions to execute their logic when the script is sourced
install_ue4ss
backup_ue4ss_log
