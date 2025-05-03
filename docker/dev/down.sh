#!/usr/bin/bash

# *** DEV ***

docker compose -p tpl-fastify-dev --env-file ../../.env down --remove-orphans --rmi all
