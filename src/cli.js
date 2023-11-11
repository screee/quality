#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const {exec} = require('child_process');
const package = require('../package.json');
const FS = require('fs');
const Path = require('path');

// TODO add help command
const command = process.argv[2];
if (command === 'init') {
  init();
} else {
  script(command);
}

async function script(name) {
  const allowedScripts = ['lint', 'lint-fix', 'preinstall', 'precommit', 'install-precommit'];

  if (allowedScripts.includes(name)) {
    // TODO allow console color
    const process = exec(package.scripts[name]);
    process.stdout.on('data', data => console.log(data));
    process.stderr.on('data', data => console.error(data));
  } else {
    console.error(
      `${name} is not a valid command. Valid commands are: ${allowedScripts.join(', ')}`,
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
          console.warn(`Added ${file}`);
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
