#!/bin/bash
################################
# PalHUB by dekitarpg@gmail.com
################################

source /app/logger.sh

backup_data() {
    local source="$1"
    local backup_dir="$2"
    local backup_limit="$3"
    local log_file="${4:-/app/logs/backups.log}"

    log "info" "$(date)" "$log_file"
    log "info" "Running backup for: $source" "$log_file"
    log "info" "Backup directory: $backup_dir" "$log_file"

    # Generate timestamp for the current backup
    local timestamp=$(date +"%Y%m%d%H%M%S")

    local backup_file="$backup_dir/${timestamp}.tgz"

    # Ensure the backup directory exists, create it if not
    mkdir -p "$backup_dir" || die "Failed to create directory: $backup_dir" "$log_file"

    log "info" "Backing up data" "$log_file"

    if [ -d "$source" ]; then
        # Source is a directory, use tar
        tar -czf "$backup_file" "$source" || die "Backup Failed!!" "$log_file"
    elif [ -f "$source" ]; then
        # Source is a file, use cp
        cp "$source" "$backup_file" || die "Backup Failed!!" "$log_file"
    else
        die "Invalid source: $source. It must be a file or directory." "$log_file"
    fi

    log "info" "Removing overgrown backups" "$log_file"

    # Limit the number of backups
    current_backups=$(ls -1t "$backup_dir" | grep -E '[0-9]{14}\.(tgz|log)' | head -n "$backup_limit")

    for old_backup in $(ls -1t "$backup_dir" | grep -E '[0-9]{14}\.(tgz|log)' | tail -n +$((backup_limit + 1))); do
        rm "$backup_dir/$old_backup" || die "Failed to remove old backup: $old_backup" "$log_file"
        log "info" "REMOVED BACKUP: ${backup_dir}/${old_backup}" "$log_file"
    done

    log "info" "Backup and cleanup completed successfully." "$log_file"
}
