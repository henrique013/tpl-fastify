#!/usr/bin/bash

# *** DEV ***

./down.sh

docker compose --env-file ../../.env up --build
