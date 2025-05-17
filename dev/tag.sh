#!/usr/bin/bash

# remove 'v' prefix from version if it exists
version=${1#v}

# validate version format (must be in format: 9.9.9)
if ! [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in SemVer format (e.g. 1.2.3)"
    exit 1
fi

# tag the version
git tag "v$version"

# push the tag to the remote repository
git push origin "v$version"
