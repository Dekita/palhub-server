# PalHUB::Server
Easily run the windows palworld server on linux with ue4ss mod-loading support!! 

## About
PalHUB::Server is a docker compose configuration designed to run the windows version of the dedicated palworld server on linux. It does this to allow for full mod-loading functionality powered by [UE4SS](https://github.com/UE4SS-RE/RE-UE4SS), which currently only runs on windows. To achieve this, the server is running under proton/wine using the [cm2network/steamcmd](https://hub.docker.com/r/cm2network/steamcmd) container as a base. 


Along with running the standard windows dedicated palworld game server, this configuration includes additional admin tools. This includes;
- NginX proxy setup to allow for advanced route/port control / admin protected routes
- Netdata dashboard for full system metrics
- A basic http website with the following endpoints;
  - / (simple endpoint to validate system functionality)
  - /files (allows you to view the game server files - requires htpasswd admin)
  - /netdata (allows you to monitor system metrics - requires htpasswd admin)

## Requirements
needs docker + docker-compose on the system
build within linux machine or wsl terminal

## Instructions
- (optional) make .env file and edit settings
```
cp env.default .env
vi .env
...
```

- (optional) force build image
```
docker compose build
```

- start the server
```
docker compose up -d
```

- (optional) check docker log
```
docker compose logs -f
```

- shutdown server
```
docker compose down
```

## Files
Palworld server installation will be under `server/palworld`. This folder is a direct mirror to the containers server install for the game. It contains the Binaries, Content, Config type folders that you would expect, and can edit to apply custom configuration and mods. 

When enabled, ue4ss will be installed within the aforementioend directory, under the `Binaries/Win64` directory. 

PAK mods should be added into the `server/palworld/Content/Paks/~mods` directory. 
LUA mods should be added into the `server/palworld/Binaries/Win64/Mods` directory.
PAK LOGIC mods should be added into the `server/palworld/Content/Paks/LogicMods` directory.  

### PAK mods vs PAK LOGIC mods
The main difference between these two type of mods, is that a PAK LOGIC mod has been created in a very specific way to provide additional game logic or mechanics. A regular PAK mod would not do this, and would instead override some default game asset, for example - data tables to add custom items or alter item drop rates.. 

## Backups
Automatic backups are enabled by defualt every hour. This can be customized using ENV variables. Backup files will be automatically zipped and saved into 'backups'.

## Common Errors
If building on windows, you MUST be WITHIN a wsl environment & command terminal to build the container properly. I havent been able to build this properly from a windows command line. If you know why and can help, let me know <3
If you get the `unexpected permission` error when building, run `sudo chmod -R 755 ./server`.

### Credit && Thanks
- Tangerie - for helping with my build issues and general idiotic questions
- Peepoturtle - for their initial repo on running palworld windows server via proton

#### Notes: 
Default admin credentials for .htpasswd: user=PalHUB pass=PassHUB
This will be properly implemented once the admin panel is setup. 

The files within the 'logs' directory will be cleaned for each boot, not including the logs/subfolders, which are mounted from their respective running containers.. eg, logs/nginx are the log files from the nginx instance - and its upto that how often it cleans those. 

#### TODO:
- allow for simple customized 'landing page' on the / route.
- add basic admin panel to control server config + rcon support etc. 
- validate community server listing works as intended
- netdata.conf doesnt seem to be getting properly read - fix that
  - add custom netdata panels for game specific events using statsd
