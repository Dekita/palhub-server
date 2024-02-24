#!/bin/bash

steamcmd=${STEAM_HOME}/steamcmd/steamcmd.sh

# ensure palworld server directory exists
mkdir -p ${INTERNAL_PALWORLD_SERVER_DIR}

# ensure palworld server directory has correct permissions
DirPerm=$(stat -c "%u:%g:%a" ${INTERNAL_PALWORLD_SERVER_DIR})
if [ "${DirPerm}" != "1000:1000:755" ];then
    echo "${INTERNAL_PALWORLD_SERVER_DIR} has unexpected permission ${DirPerm} != 1000:1000:755"
    exit 1
fi

# run steamcmd to install update of the game
$steamcmd +@sSteamCmdForcePlatformType windows +force_install_dir ${INTERNAL_PALWORLD_SERVER_DIR} +login anonymous +app_update ${APPID} validate +quit || die

# store reference to the main palworld server executable
PALWORLD_SERVER_EXE="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/PalServer-Win64-Test.exe"
if [ ! -f ${PALWORLD_SERVER_EXE} ];then
    echo "${PALWORLD_SERVER_EXE} does not exist"
    exit 1
fi
