FROM cm2network/steamcmd:root

RUN apt-get update && apt-get install -y gosu cron wget python3 libfreetype6

# ENV variables
# set PalHUB version information
ENV PalHUB="0.0.9" \
    # define game app id
    APPID=2394010 \
    # define ue4ss version
    UE4SS_VERSION=3.0.1 \
    # define proton version
    PROTON_VERSION=GE-Proton8-28 \
    # steam/proton related variables
    STEAM_USER="${USER}" \
    STEAM_HOME="/home/${USER}" \
    STEAM_PATH="/home/${USER}/.steam/steam"

ENV STEAM_COMPAT_CLIENT_INSTALL_PATH=${STEAM_PATH} \
    STEAM_COMPAT_DATA_PATH=${STEAM_PATH}/steamapps/compatdata/${APPID} \
    PROTON=${STEAM_PATH}/compatibilitytools.d/${PROTON_VERSION}/proton

RUN mkdir -p ${STEAM_PATH}
WORKDIR ${STEAM_PATH}

# Install Proton build from Glorious Eggroll
RUN mkdir -p compatibilitytools.d/
RUN wget -O - \
    https://github.com/GloriousEggroll/proton-ge-custom/releases/download/${PROTON_VERSION}/${PROTON_VERSION}.tar.gz \
    | tar -xz -C compatibilitytools.d/
RUN mkdir -p steamapps/compatdata/${APPID}
RUN cp -r compatibilitytools.d/${PROTON_VERSION}/files/share/default_pfx steamapps/compatdata/${APPID}
# set owner of steam related files to steam user
RUN chown -R ${USER}:${USER} ${STEAM_HOME}

# copy main entrypoint file
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# copy main server script files
COPY ./scripts /app
RUN chmod +x /app/*.sh

ENTRYPOINT ["/entrypoint.sh"]
