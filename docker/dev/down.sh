#!/usr/bin/bash

# *** DEV ***

docker compose --env-file ../../.env down --remove-orphans --rmi all
