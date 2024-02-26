#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

source /app/logger.sh

STEAM_LOG_FILE=/app/logs/update.log

log "info" "Running steamcmd installer/updater"
# store reference to the steamcmd script
STEAMCMD=${STEAM_HOME}/steamcmd/steamcmd.sh

# ensure palworld server directory exists
mkdir -p ${INTERNAL_PALWORLD_SERVER_DIR}

# ensure palworld server directory has correct permissions or die
SERVER_DIR_PERMS=$(stat -c "%u:%g:%a" $INTERNAL_PALWORLD_SERVER_DIR)
[ "$SERVER_DIR_PERMS" != "1000:1000:755" ] && die "$INTERNAL_PALWORLD_SERVER_DIR has unexpected permission $SERVER_DIR_PERMS != 1000:1000:755"

# run steamcmd to install or update the game, or die if failed
$STEAMCMD +@sSteamCmdForcePlatformType windows +force_install_dir ${INTERNAL_PALWORLD_SERVER_DIR} +login anonymous +app_update ${APPID} validate +quit  2>&1 | tee -a $STEAM_LOG_FILE || die "Failed to install/update game server!!" 

# ensure file exists or die
[ ! -f ${PALWORLD_SERVER_EXE} ] && die "${PALWORLD_SERVER_EXE} does not exist"

# if server config ini is empty (just installed) then copy default settings!
if [ -z "$(grep -E -v '^\s*#' "${PALWORLD_CONFIG_INI}" | grep -E -v '^\s*$')" ]; then 
    # Copy default-config, which comes with SteamCMD to gameserver save location
    cp "${INTERNAL_PALWORLD_SERVER_DIR}/DefaultPalWorldSettings.ini" "${PALWORLD_CONFIG_INI}"
    log "info" "DefaultPalWorldSettings.ini copied to ${PALWORLD_CONFIG_INI}"
fi 
