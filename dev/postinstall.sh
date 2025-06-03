#!/usr/bin/bash

# run lefthook install only in development
if [[ "$NODE_ENV" == "development" ]]; then
    lefthook install
fi
