#!/bin/bash
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

launch_py_server() {
    # Run the Python listener server
    # this communicates with the admin container to allow bi-directional communication with the host machine. 
    # it is used to provide shutdown/restart/update type commands that run on the host machine which
    # allows for the underlying repository/containers to be properly updated etc. 
    python3 ./launcher/server.py & 

    # Wait for the Python server to start and bind to the port
    while ! nc -z localhost 8080; do
        sleep 1
    done
}


log_current_file() {
    echo "[PY RUN CMD]: $(basename $0)"
}

stop_containers() {
    echo "Stopping containers..."
    docker-compose down
    echo "Container stopped?"
}

start_containers() {
    docker compose up #-d
    echo "Container restarted!"
}

rebuild_containers() {
    docker compose up --build --force-recreate
    # docker-compose up #-d
    echo "Container rebuilt & restarted!"
}


# This script requires jq for parsing JSON responses
# apt-get install jq (done within dockerfile)
update_repo() {
    echo "Pulling latest repo!"

    # docker-compose pull
    # git clone https://github.com/Dekita/palhub-server.git ./
    # wget -O ./latest.zip https://github.com/Dekita/palhub-server/releases/latest

    # get the latest version release from github
    release_url="https://api.github.com/repos/dekitarpg/palhub-server/releases/latest"

    # Get the download URL for the zip file from the latest release
    zip_url=$(curl -s $release_url | jq -r '.zipball_url')

    # Download the zip file
    curl -LJO $zip_url

    # Extract the contents if needed
    unzip -q "*.zip"

    # Cleanup - remove the downloaded zip file
    rm -f *.zip
}
