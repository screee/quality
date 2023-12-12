#!/bin/bash

set -e

red='\033[0;31m'

if [[ -n $(git ls-files . --exclude-standard --others --modified) ]]; then
  echo -e "\n${red}There are unstaged changes in your working directory.\nThis prevents the git precommit hook from accurately testing your commit.\Try running "git stash" before committing.\n"
  exit 1
else
  yarn --silent run lint-fix
  git add -A
fi;
