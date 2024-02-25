#!/bin/bash
# Define colors
LOG_COLOR_RED='\e[31m'
LOG_COLOR_BLUE='\e[34m'
LOG_COLOR_GREEN='\e[32m'
LOG_COLOR_YELLOW='\e[33m'
LOG_COLOR_NC='\e[0m' # No Color

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
    echo -e "$color[$level]$LOG_COLOR_NC $message"

    # Save to the specified file if file is specified
    [ -n "$file" ] && echo "[$level] $message" >> "$file"
}

# Function to handle errors and exit
die() {
    log "error" "[$0] $1" "${2:-}"
    while [ 1 ]; do sleep 10;done
    # sleep 10; exit 1
}
