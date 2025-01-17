#!/bin/bash

set -e

if [ -f .git/hooks/pre-commit ]; then
  echo -e 'Not overwriting .git/hooks/pre-commit';
else
  echo -e '#!/bin/sh\nyarn run precommit' > .git/hooks/pre-commit;
  chmod +x .git/hooks/pre-commit;
  echo 'Added .git/hooks/pre-commit';
fi
