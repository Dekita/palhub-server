
# Files
Palworld server installation will be under `server/palworld`. This folder is a where the palworld containers game server install will be mounted from. It contains the Binaries, Content, Config type folders that you would expect, which can be edited to apply custom configuration and mods. 

When enabled, ue4ss will be installed under the `server/palworld/Pal/Binaries/Win64` directory. 

PAK mods should be added into the `server/palworld/Pal/Content/Paks/~mods` directory. 
LUA mods should be added into the `server/palworld/Pal/Binaries/Win64/Mods` directory.
PAK LOGIC mods should be added into the `server/palworld/Pal/Content/Paks/LogicMods` directory.  

# PAK mods vs PAK LOGIC mods
The main difference between these two type of mods, is that a PAK LOGIC mod has been created in a very specific way to provide additional game logic or mechanics. A regular PAK mod would not do this, and would instead override some default game asset, for example - data tables to add custom items or alter item drop rates.. 

# Backups
Automatic world backups are enabled by default every hour. This can be customized using ENV variables. Backup files will be automatically zipped and saved into 'backups'.

## Notes: 
The files within the 'logs' directory will be cleaned for each boot, not including the logs/subfolders, which are mounted from their respective running containers.. eg, logs/nginx are the log files from the nginx instance - and its upto that how often it cleans those. 
