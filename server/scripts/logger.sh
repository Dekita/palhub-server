#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################

# Define colors
LOG_COLOR_RED='\e[31m'
LOG_COLOR_BLUE='\e[34m'
LOG_COLOR_GREEN='\e[32m'
LOG_COLOR_YELLOW='\e[33m'
LOG_COLOR_NC='\e[0m' # No Color

clear_log_dir(){
    directory_to_clear="/app/logs"
    # Check if the directory exists
    if [ -d "$directory_to_clear" ]; then
        # Use rm with -r (recursive) and -f (force) options to delete all contents
        rm -f "$directory_to_clear"/*
        # rm -rf "$directory_to_clear"/*
        
        log "info" "Directory cleared successfully."
    else
        log "error" "Directory not found."
    fi
}

# Function to echo information with color and save to a file
log() {
    local level="${1:-info}"
    local message="${2:-No message to log}"
    local file="${3:-}"

    # Set color based on argument
    if [ "$level" == "success" ]; then
        local color="$LOG_COLOR_GREEN"
    elif [ "$level" == "error" ]; then
        local color="$LOG_COLOR_RED"
    elif [ "$level" == "info" ]; then
        local color="$LOG_COLOR_BLUE"
    elif [ "$level" == "warning" ]; then
        local color="$LOG_COLOR_YELLOW"
    else
        local color="$LOG_COLOR_NC"
    fi

    # Echo to the console with color
    echo -e "$color[$level] $message $LOG_COLOR_NC"

    # Save to the specified file if file is specified
    [ -n "$file" ] && echo "[$level] $message" >> "$file"
}

# Function to handle errors and exit
die() {
    log "error" "[$0] $1" "${2:-}"
    while [ 1 ]; do sleep 10;done
    # sleep 10; exit 1
}

################################
# PalHUB by dekitarpg@gmail.com
################################
