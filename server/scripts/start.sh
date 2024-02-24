#!/bin/bash

die() {
    echo "$0 script failed, hanging forever..."
    while [ 1 ]; do sleep 10;done
    # exit 1
}

id
if [ "$(id -u)" != "1000" ];then
    echo "script must run as steam"
    die
fi

steamcmd=${STEAM_HOME}/steamcmd/steamcmd.sh

ACTUAL_PORT=8211
if [ "$PORT" != "" ];then
    ACTUAL_PORT=${PORT}
fi
ARGS="$ARGS -port=$ACTUAL_PORT -publicport=$ACTUAL_PORT"

if [ "${PLAYERS}" != "" ];then
    ARGS="${ARGS} -players=${PLAYERS}"
fi
if [ "${SERVER_NAME}" != "" ];then
    ARGS="${ARGS} -servername=${SERVER_NAME}"
fi
if [ "${SERVER_PASSWORD}" != "" ];then
    ARGS="${ARGS} -serverpassword=${SERVER_PASSWORD}"
fi
if [ "${SERVER_PASSWORD}" != "" ];then
    ARGS="${ARGS} -serverpassword=${SERVER_PASSWORD}"
fi
if [ "${NO_MULTITHREADING}" ]; then
    ARGS=${ARGS}
else
    ARGS="${ARGS} -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS"
fi 

# advertise server
ARGS="${ARGS} EpicApp=PalServer"

PalServerDir=/app/PalServer

mkdir -p ${PalServerDir}
DirPerm=$(stat -c "%u:%g:%a" ${PalServerDir})
if [ "${DirPerm}" != "1000:1000:755" ];then
    echo "${PalServerDir} has unexpected permission ${DirPerm} != 1000:1000:755"
    die
fi

# set -x
$steamcmd +@sSteamCmdForcePlatformType windows +force_install_dir ${PalServerDir} +login anonymous +app_update ${APPID} validate +quit || die
# set +x

PalServerExe="${PalServerDir}/Pal/Binaries/Win64/PalServer-Win64-Test.exe"
if [ ! -f ${PalServerExe} ];then
    echo "${PalServerExe} does not exist"
    die
fi

# ensure ue4ss is installed
source /app/ue4ss.sh

# # ADD_TEMP_BPMODLOADER_FIX=true
# if [ ! -f "$PalServerDir/Pal/Binaries/Win64/dwmapi.dll" ]; then
#     echo "Installing UE4SS"
#     # cp -rf /app/ue4ss/* ${PalServerDir}/Pal/Binaries/Win64/

#     # Download the zip file from the GitHub release
#     wget -O /tmp/ue4ss.zip https://github.com/UE4SS-RE/RE-UE4SS/releases/download/v3.0.1/UE4SS_v3.0.1.zip
#     # Extract the contents to the destination folder
#     unzip /tmp/ue4ss.zip -d ${PalServerDir}/Pal/Binaries/Win64/
#     # Download the additional BPModLoaderMod file
#     if ["$ADD_TEMP_BPMODLOADER_FIX" = true]; then
#         BPModloaderPath=Mods/BPModLoaderMod/Scripts/main.lua
#         BPModloaderFixURL=https://raw.githubusercontent.com/Okaetsu/RE-UE4SS/logicmod-temp-fix
#         wget -O ${PalServerDir}/Pal/Binaries/Win64/${BPModloaderPath} ${BPModloaderFixURL}/assets/${BPModloaderPath}
#     fi


#     # # Path to the config file
#     # configFile="${PalServerDir}/Pal/Binaries/Win64/config.ini"

#     # # The new value you want to set
#     # newVariable1Value="new_value1"

#     # # Update the INI file
#     # if [ -f "$configFile" ]; then
#     #     # Use sed to replace the value
#     #     sed -i "s/^Variable1=.*/Variable1=${newVariable1Value}/" "$configFile"
#     # fi

#     # Remove the temporary zip file
#     rm /tmp/ue4ss.zip
# fi




# if [ ! -f "" ]; then
#     echo "Copying default crontab"
#     cp -f /app/crontab /app/backups/crontab
# fi

crontab /app/crontab || die

# CMD="$PROTON run $PalServerExe ${ARGS}"
# echo "starting server with: ${CMD}"
# ${CMD} || die


CMD="$PROTON run $PalServerExe ${ARGS}"
echo "CMD: ${CMD}"
${CMD} &

echo "UE4SS log begin:"
tail -f "${PalServerDir}/Pal/Binaries/Win64/UE4SS.log" || die