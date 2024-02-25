#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################


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
PALWORLD_SERVER_ARGS="${ARGS} EpicApp=PalServer"

################################
# PalHUB by dekitarpg@gmail.com
################################
