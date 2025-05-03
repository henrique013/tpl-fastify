#!/usr/bin/bash

# *** PROD ***

./down.sh

docker compose -p tpl-fastify-prod up --build
