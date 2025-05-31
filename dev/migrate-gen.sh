#!/usr/bin/bash

migration_name=$1

# validate migration name format (must be in format: add-users-table)
if ! [[ $migration_name =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "Error: Migration name must be in lowercase alphanumeric format (e.g. add-users-table)"
    exit 1
fi

# generate the migration
npx dotenv -e dev/.env -- npx drizzle-kit generate --name $migration_name
