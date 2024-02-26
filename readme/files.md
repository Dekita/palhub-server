
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
