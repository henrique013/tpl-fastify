#!/usr/bin/bash

# *** DEV ***

./down.sh

docker compose -p tpl-fastify-dev up --build
