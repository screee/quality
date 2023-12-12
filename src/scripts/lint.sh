#!/bin/bash

set -e

start='\n\033[1;34m' # bold blue
end='\033[0m' # reset

echo -e "${start}prettier${end}" && \
prettier . --check && \
echo -e "${start}tsc${end}" && \
tsc --noEmit && \
echo -e "${start}eslint${end}" && \
eslint --ext .js,.ts,.tsx . && \
echo -e ""
