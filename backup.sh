#!/usr/bin/env bash

# this script can be added to crontab 
# connection string should be in a file .pgpass protected with permissions of 0600
# see .pgpass.example for format
# WARNING: no real error checking, use at your own risk"


##############################
# Required variables
##############################

source bkup_credentials.sh

if [[ -z "$BKUP_USER_EMAIL" || -z "$BKUP_USER_PASS" ]] ; then
  echo "Error: BUKP_USER_EMAIL or BKUP_USER_PASS environment variables are not set"
  echo "Please ensure they are set before running this backup"
  exit 1
fi

echo $BKUP_USER_EMAIL
echo $BKUP_USER_PASS

export PGPASSFILE=./.pgpass
PROJECT_ID="ccdevamyzihnfdoshxoq"
BKUP_FILE="beeRate-dump-$(date +%Y%M%d-%H%m).sql.gz"
PGDUMP_PATH="/opt/homebrew/Cellar/postgresql@15/15.4/bin/pg_dump"
DB_HOST="db.${PROJECT_ID}.supabase.co"
DB_USER="postgres"
DB="postgres"
SUPA_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZGV2YW15emlobmZkb3NoeG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyODcyNDMsImV4cCI6MjAxMDg2MzI0M30._rvZ3LgSvGDclNiInc9HsIaDw4_gqP5D-7sieAc08qw"
AUTH_URL="https://${PROJECT_ID}.supabase.co/auth/v1/token?grant_type=password"
STORAGE_BUCKET="backups"
STORAGE_URL="https://${PROJECT_ID}.supabase.co/storage/v1/object/${STORAGE_BUCKET}"


##############################
# Take a backup
##############################

# data dump and gzip
"$PGDUMP_PATH" --compress=9 -U "$DB_USER" -h "$DB_HOST" "$DB" > "$BKUP_FILE"

# check the contents
file "$BKUP_FILE"


##############################
# Now put the backup into storage...
##############################

# get a valid auth token

AUTH_TOKEN=$(curl -s -X POST \
-H "apikey: $SUPA_ANON_KEY" \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
--data '{"email":"'"$BKUP_USER_EMAIL"'","password":"'"$BKUP_USER_PASS"'"}' \
"$AUTH_URL" | jq -r '.access_token')


# upload gzip to storage
curl -X POST \
-H "Authorization: Bearer $AUTH_TOKEN" \
-H "Content-Type: application/sql" \
-H "Content-Encoding: gzip" \
"${STORAGE_URL}/${BKUP_FILE}" \
-d "@$BKUP_FILE"


# Finally quick clean up
rm "${BKUP_FILE}"
