#!/usr/bin/bash

# *** DEV ***

./down.sh

docker compose -p tpl-fastify-dev --env-file ../../.env up --build
