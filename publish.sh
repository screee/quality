#!/bin/bash

set -e

red='\033[0;31m'

if [[ -n $(git ls-files . --exclude-standard --others --modified) ]]; then
  echo -e "\n${red}There are uncommitted changes in your working directory.\nPlease commit before continuing."
  exit 1
fi

yarn --cwd ./src/eslint publish

eslintVersion=`jq -r '.version' src/eslint/package.json`
nextPackage=`jq ".dependencies.\"@scree/eslint-config-quality\" = \"$eslintVersion\"" package.json`
echo -E "${nextPackage}" > package.json

git add package.json
git commit -am "Bump @scree/eslint-config-quality to ${eslintVersion}"

yarn --cwd . publish
