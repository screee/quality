#!/bin/bash

set -e

red='\033[0;31m'

# if [[ -n $(git ls-files . --exclude-standard --others --modified) ]]; then
#   echo -e "\n${red}There are uncommitted changes in your working directory.\nPlease commit before continuing."
#   exit 1
# fi

(cd ./src/eslint && npm publish)

eslintVersion=`jq -r '.version' src/eslint/package.json`
nextPackage=`jq ".dependencies.\"@scree/eslint-config-quality\" = \"$eslintVersion\"" package.json`
echo -E "${nextPackage}" > package.json

npm run fix
git add package.json
git add src/eslint/package.json
git commit -m "Bump @scree/eslint-config-quality to ${eslintVersion}"

npm publish
