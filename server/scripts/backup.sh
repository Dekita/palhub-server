#!/bin/bash
DIR=`dirname $(realpath $0)`

SAVEGAMES_DIR=/app/PalServer/Pal/Saved/SaveGames

BACKUP_DIR=/app/backups
BACKUP_FILE="${BACKUP_DIR}/$(date +%Y%m%d_%H%M%S).tgz"

CMD="tar -czf ${BACKUP_FILE} ${SAVEGAMES_DIR}"
echo "backing up $CMD"
$CMD
