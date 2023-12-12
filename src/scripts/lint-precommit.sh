#!/bin/bash

set -e

red='\033[0;31m'

beforeDiff=`git diff`

if [[ -n $(git ls-files . --exclude-standard --others --modified) ]] && ! git diff --cached --quiet; then
  echo -e "\n${red}There are unstaged changes in your working directory.\nThis prevents the precommit hook from accurately testing your commit.\nTry running \`git stash\` before committing.\n"
  exit 1
fi

yarn run --silent lint-fix

afterDiff=`git diff`

if [[ "$beforeDiff" != "$afterDiff" ]] && git diff --cached --quiet; then
  echo -e "\n${red}Some lint errors have been auto-fixed. Please review the changes and then try committing again\n"
  exit 1
fi

# Check if any files have been modified by eslint
if [[ -n $(git ls-files . --exclude-standard --others --modified) ]] && ! git diff --cached --quiet; then
  git add -u
  echo -e "\n${red}Some lint errors have been auto-fixed. Please review the changes and then try committing again\n"
  exit 1
fi
