#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const {spawn} = require('child_process');
const packageJson = require('../package.json');
const FS = require('fs');
const Path = require('path');

// TODO add help command
const command = process.argv[2];
if (command === 'init') {
  init();
} else {
  script(command);
}

/**
 * @param {string} name
 */
async function script(name) {
  const allowedScripts = [
    'lint',
    'lint-fix',
    'preinstall',
    'lint-precommit',
    'precommit',
    'install-precommit',
  ];

  if (allowedScripts.includes(name)) {
    // TODO move implementations into separate file
    // @ts-expect-error - we check that name is a valid script using the allowedScripts array above
    await execute(packageJson.scripts[name]);
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

/**
 * @param {string} input
 * @returns
 */
async function execute(input) {
  return new Promise(resolve => {
    const child = spawn(input, {stdio: 'inherit'});
    child.on('close', code => {
      if (code === 0) resolve(code);
      else process.exit(code ?? 1);
    });
  });
}
