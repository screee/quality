#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const {exec} = require('child_process');
const package = require('../package.json');
const FS = require('fs');
const Path = require('path');

if (command === 'init') {
  init();
} else {
  script(process.argv[2]);
}

async function script(command) {
  const allowedCommands = ['lint', 'lint-fix', 'preinstall', 'precommit', 'init'];

  if (allowedCommands.includes(command)) {
    try {
      exec(package.scripts[command], {
        stdio: {
          stdin: process.stdin,
          stdout: process.stdout,
          stderr: process.stderr,
        },
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  } else {
    console.error(
      `${command} is not a valid command. Valid commands are: ${allowedCommands.join(',')}`,
    );
    process.exit(1);
  }
}

async function init() {
  const files = [
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    '.prettierignore',
    '.prettierrc',
    'tsconfig.json',
  ];

  console.log(
    await Promise.all(
      files.map(async file => {
        const src = Path.join(__dirname, '..', file);
        const dst = Path.join(process.cwd(), file);

        try {
          await FS.promises.copyFile(src, dst, FS.constants.COPYFILE_EXCL);
        } catch (error) {
          if (error.code == 'EEXIST') {
            console.warn(`Not overwriting ${file}`);
          } else {
            throw error;
          }
        }

        return dst;
      }),
    ),
  );

  await script('install-precommit');
}
