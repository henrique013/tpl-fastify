#!/usr/bin/bash

# *** PROD ***

docker compose -p tpl-fastify-prod down --remove-orphans --rmi all
