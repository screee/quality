#!/usr/bin/env node

const FS = require('fs');
const Path = require('path');
const {execScript} = require('../execScript');
const {execShell} = require('../execShell');

async function main() {
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
      const src = Path.join(__dirname, '..', '..', file);
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

  await execShell('git init');
  await execScript('install-precommit');
}

main();
