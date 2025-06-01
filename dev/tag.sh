#!/usr/bin/bash

# validate version type
if [[ ! "$1" =~ ^(major|minor|patch)$ ]]; then
    echo "Error: Version type must be one of: major, minor, patch"
    exit 1
fi

# use npm version to create the tag
npm version "$1"

# push the commits and tags
git push origin
git push origin --tags
