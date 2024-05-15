#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

# include logger helper
source /app/logger.sh

# install/update game server
if [ ! -f ${PALWORLD_SERVER_EXE} ]; then 
    source /app/steam.sh
elif [ ${AUTO_UPDATE_ON_START} = true ]; then 
    source /app/steam.sh
fi

launch_server() {
    # NEED TO MATCH NGINX ROUTING 
    # this may be different from the external connection ports. 
    # make sure this matches the nginx configuration!! 
    local internal_game_port=8211
    local internal_comm_port=27015
    local internal_rcon_port=25575
    local internal_rest_port=8212

    local server_args="-port=$internal_game_port"
    [ "$PALWORLD_SHOW_SERVER" = true ] && server_args+=" -queryport=$internal_comm_port"
    [ "$PALWORLD_MULTITHREAD" = true ] && server_args+=" -useperfthreads -UseMultithreadForDS"
    [ "$PALWORLD_ASYNCTHREAD" = false ] && server_args+=" -NoAsyncLoadingThread"
    [ "$PALWORLD_SHOW_SERVER" = true ] && server_args+=" -publiclobby" #EpicApp=PalServer"
    [ "$PALWORLD_ENABLE_RCON" = true ] && server_args+=" -RCONPort=$internal_rcon_port"
    [ "$PALWORLD_ENABLE_REST" = true ] && server_args+=" -RESTAPIPort=$internal_rest_port"

    # DOES NOT WORK:
    # PALWORLD_SERVER_EXE="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/PalServer-Win64-Shipping-Cmd.exe"
    # launch_command="$PROTON run $PALWORLD_SERVER_EXE"

    # DOES NOT WORK:
    # cd "${INTERNAL_PALWORLD_SERVER_DIR}"
    # launch_command="$PROTON run ./Pal/Binaries/Win64/PalServer-Win64-Shipping-Cmd.exe"

    # WORKS:>:
    # cd "${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64"
    # launch_command="$PROTON run ./PalServer-Win64-Shipping-Cmd.exe ${server_args}"

    # run main proton command to launch server
    cd "${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64"
    launch_command="$PROTON run ./PalServer-Win64-Shipping-Cmd.exe ${server_args}"
    # launch_command="$PROTON run $PALWORLD_SERVER_EXE ${server_args}"

    
    log "info" "launch_command: ${launch_command}"
    ${launch_command}
}
