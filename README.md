# PalHUB::Server
Easily run the windows palworld server on linux with ue4ss mod-loading support!! 

## Additional Details
PalHUB::Server is a docker compose configuration designed to run the windows version of the dedicated palworld server on linux. It does this to allow for full mod-loading functionality powered by [UE4SS](https://github.com/UE4SS-RE/RE-UE4SS), which currently only runs on windows. To achieve this, the game server container is running under proton/wine [[proton-ge-custom]](https://github.com/GloriousEggroll/proton-ge-custom) by using the [cm2network/steamcmd](https://hub.docker.com/r/cm2network/steamcmd) container as a base. 

## Features
- Run windows palworld server on linux machines
- Full mod-loading functionality on the game server

## Advanced Features
- NginX proxy setup to allow for advanced route/port control / admin protected routes
- Netdata dashboard for full system metrics
- A basic http website with the following endpoints;
  - / (simple endpoint to validate system functionality)
  - /logs (allows you to view the system logs folder - requires htpasswd admin)
  - /files (allows you to view the game server files - requires htpasswd admin)
  - /netdata (allows you to monitor system metrics - requires htpasswd admin)

## Requirements
- needs docker + docker-compose on the system
- build within linux machine or wsl terminal

## Quickstart
- [Install Guide](/readme/install.md) 
- [ENV Variables](/readme/configuration.md)
- [Admin Setup](/readme/admins.md)
- [Files, Mods, Backups](readme/files.md)

#### TODO:
see [todo-list](/readme/todo.md)

#### Notes: 
The files within the 'logs' directory will be cleaned for each boot, not including the logs/subfolders, which are mounted from their respective running containers.. eg, logs/nginx are the log files from the nginx instance - and its upto that how often it cleans those. 

### Credit && Thanks
- Tangerie - for helping with my build issues and general idiotic questions
- Peepoturtle - for their initial repo on running palworld windows server via proton
