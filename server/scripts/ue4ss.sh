# File: ue4ss.sh

install_ue4ss() {
    # ADD_TEMP_BPMODLOADER_FIX=true
    if [ ! -f "$PalServerDir/Pal/Binaries/Win64/dwmapi.dll" ]; then
        echo "Installing UE4SS"
        # cp -rf /app/ue4ss/* ${PalServerDir}/Pal/Binaries/Win64/

        # Download the zip file from the GitHub release
        wget -O /tmp/ue4ss.zip https://github.com/UE4SS-RE/RE-UE4SS/releases/download/v3.0.1/UE4SS_v3.0.1.zip
        # Extract the contents to the destination folder
        unzip /tmp/ue4ss.zip -d ${PalServerDir}/Pal/Binaries/Win64/
        
        # Download the additional BPModLoaderMod file
        if [ "$ADD_TEMP_BPMODLOADER_FIX" = true ]; then
            BPModloaderPath=Mods/BPModLoaderMod/Scripts/main.lua
            BPModloaderFixURL=https://raw.githubusercontent.com/Okaetsu/RE-UE4SS/logicmod-temp-fix
            wget -O ${PalServerDir}/Pal/Binaries/Win64/${BPModloaderPath} ${BPModloaderFixURL}/assets/${BPModloaderPath}
        fi

        # Remove the temporary zip file
        rm /tmp/ue4ss.zip
    fi
}

# Call the function to execute the logic when the script is sourced
install_ue4ss