#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################

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
    # local internal_rcon_port=25575

    local server_args="-port=$internal_game_port -queryport=$internal_comm_port"
    [ "$PALWORLD_MULTITHREAD" = true ] && server_args+=" -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS"
    [ "$PALWORLD_SHOW_SERVER" = true ] && server_args+=" EpicApp=PalServer"

    # run main proton command to launch server
    launch_command="$PROTON run $PALWORLD_SERVER_EXE ${server_args}"
    log "info" "launch_command: ${launch_command}"
    ${launch_command}
}
