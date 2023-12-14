#!/bin/bash

set -e

red='\033[0;31m'

beforeDiff=`git diff`

if [[ -n $(git ls-files . --exclude-standard --others --modified) ]] && ! git diff --cached --quiet; then
  echo -e "\n${red}There are unstaged changes in your working directory.\nThis prevents the precommit hook from accurately testing your commit.\nPlease run \`git add -A\` or \`git stash\` and try again.\n"
  exit 1
fi

yarn run --silent lint-fix

afterDiff=`git diff`

# The user probably used the git commit "-a" flag
if git diff --cached --quiet; then
  if [[ "$beforeDiff" != "$afterDiff" ]] ; then
    echo -e "\n${red}Some lint errors have been auto-fixed. Please review the changes and then try committing again\n"
    exit 1
  fi
# The user probably did NOT use the git commit "-a" flag
else
  if [[ -n $(git ls-files . --exclude-standard --others --modified) ]] ; then
    echo -e "\n${red}Some lint errors have been auto-fixed. Please review the changes and then try committing again\n"
    exit 1
  fi
fi


