#!/usr/bin/bash

# run the migrations
docker-compose exec api ash -c "npx drizzle-kit migrate"
