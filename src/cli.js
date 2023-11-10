#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const {exec} = require('child_process');
const package = require('../package.json');
const FS = require('fs')
const Path = require('path')

const command = process.argv[2];

const allowedCommands = ['lint', 'lint-fix', 'preinstall', 'precommit', 'init'];

try {
  if (command === 'init') {
    init()
  } else if (allowedCommands.includes(command)) {
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

async function init() {
  const files = [
    '.eslintignore',
    '.eslintrc.json',
    '.gitignore',
    '.prettierignore',
    '.prettierrc',
    'tsconfig.json'
  ]

  console.log(await Promise.all(files.map(async file => {
    const src = Path.join(__dirname, '..', file)
    const dst = Path.join(process.cwd(), file)

    try {
      await FS.promises.copyFile(src, dst, FS.constants.COPYFILE_EXCL)
    } catch (error) {
      if (error.code !== 'EEXIST') { throw error }
    }

    return dst
  })))
}
