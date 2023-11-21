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
    // TODO move implementations into separate file
    await execute(package.scripts[name]);
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
    '.prettierignore',
    '.prettierrc',
    'tsconfig.json',
    '.vscode/settings.json',
    '.vscode/extensions.json',
  ];

  await Promise.all(
    files.map(async file => {
      const src = Path.join(__dirname, '..', file);
      const dst = Path.join(process.cwd(), file);

      try {
        await FS.promises.mkdir(Path.dirname(dst), {recursive: true});
        await FS.promises.copyFile(src, dst, FS.constants.COPYFILE_EXCL);
        console.warn(`Added ${file}`);
      } catch (error) {
        console.error(error);
      }

      return dst;
    }),
  );

  await execute('git init');
  await script('install-precommit');
}

async function execute(input) {
  return new Promise(resolve => {
    const p = exec(input);
    p.stdout.on('data', data => process.stdout.write(data));
    p.stderr.on('data', data => process.stderr.write(data));
    p.on('close', resolve);
  });
}
