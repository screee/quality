#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const {exec} = require('child_process');
const package = require('../package.json');

const command = process.argv[2];

const allowedCommands = ['lint', 'lint-fix', 'preinstall', 'precommit'];

try {
  if (allowedCommands.includes(command)) {
    exec(package.scripts[command], {
      stdio: {
        stdin: process.stdin,
        stdout: process.stdout,
        stderr: process.stderr,
      },
    });
  } else {
    console.error(
      `${command} is not a valid command. Valid commands are: ${allowedCommands.join(',')}`,
    );
    process.exit(1);
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
