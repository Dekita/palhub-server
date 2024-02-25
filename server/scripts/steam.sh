#!/bin/bash

# include logger helper
source /app/logger.sh

# store reference to the steamcmd script
steamcmd=${STEAM_HOME}/steamcmd/steamcmd.sh

# ensure palworld server directory exists
mkdir -p ${INTERNAL_PALWORLD_SERVER_DIR}

# ensure palworld server directory has correct permissions or die
SERVER_DIR_PERMS=$(stat -c "%u:%g:%a" $INTERNAL_PALWORLD_SERVER_DIR)
[ "$SERVER_DIR_PERMS" != "1000:1000:755" ] && die "$INTERNAL_PALWORLD_SERVER_DIR has unexpected permission $SERVER_DIR_PERMS != 1000:1000:755"

# run steamcmd to install update of the game, or die if failed
$steamcmd +@sSteamCmdForcePlatformType windows +force_install_dir ${INTERNAL_PALWORLD_SERVER_DIR} +login anonymous +app_update ${APPID} validate +quit || die "Failed to install/update game server!!" 

# PALWORLD_SERVER_EXE: exposed to main.sh
# store reference to the main palworld server executable
PALWORLD_SERVER_EXE="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/PalServer-Win64-Test.exe"
# ensure file exists or die
[ ! -f ${PALWORLD_SERVER_EXE} ] && die "${PALWORLD_SERVER_EXE} does not exist"
