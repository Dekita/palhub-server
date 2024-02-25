########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

FROM cm2network/steamcmd:root

RUN apt-get update && apt-get install -y gosu cron wget python3 libfreetype6

# ENV variables
# set DEKPALHUB version information
ENV DEKPALHUB="0.0.9" \
    # define game app id
    APPID=2394010 \
    # define proton version
    PROTON_VERSION=GE-Proton8-28 \
    # steam/proton related variables
    STEAM_USER="${USER}" \
    STEAM_HOME="/home/${USER}" \
    STEAM_PATH="/home/${USER}/.steam/steam" \
    INTERNAL_PALWORLD_SERVER_DIR="/app/PalServer" 

# split env sections as the below variables require the above to be defined first!
ENV PALWORLD_SERVER_EXE="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Binaries/Win64/PalServer-Win64-Test.exe" \
    PALWORLD_CONFIG_INI="${INTERNAL_PALWORLD_SERVER_DIR}/Pal/Saved/Config/WindowsServer/PalWorldSettings.ini" \
    EGGROLL_URL="https://github.com/GloriousEggroll/proton-ge-custom/releases/download/${PROTON_VERSION}/${PROTON_VERSION}.tar.gz" \
    STEAM_COMPAT_CLIENT_INSTALL_PATH=${STEAM_PATH} \
    STEAM_COMPAT_DATA_PATH=${STEAM_PATH}/steamapps/compatdata/${APPID} \
    PROTON=${STEAM_PATH}/compatibilitytools.d/${PROTON_VERSION}/proton 

RUN mkdir -p ${STEAM_PATH}
WORKDIR ${STEAM_PATH}

COPY ./scripts /app
COPY ./entrypoint.sh /entrypoint.sh

# Install Proton build from Glorious Eggroll
RUN mkdir -p compatibilitytools.d/ && \
    wget -O - ${EGGROLL_URL} | tar -xz -C compatibilitytools.d/ && \
    mkdir -p steamapps/compatdata/${APPID} && \
    cp -r compatibilitytools.d/${PROTON_VERSION}/files/share/default_pfx steamapps/compatdata/${APPID} && \
# set owner of steam related files to steam user
    chown -R ${USER}:${USER} ${STEAM_HOME} && \
# copy main entrypoint file
    chmod +x /entrypoint.sh && \
# copy main server script files
    chmod +x /app/*.sh

ENTRYPOINT ["/entrypoint.sh"]
