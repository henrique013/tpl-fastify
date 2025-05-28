#!/usr/bin/bash

# run the migrations
docker compose run --rm api ash -c "npx drizzle-kit migrate"
