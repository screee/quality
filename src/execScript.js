/* eslint-disable @typescript-eslint/no-require-imports, no-console */

const FS = require('fs');
const Path = require('path');
const {execShell} = require('./execShell');

const dir = Path.resolve(__dirname, '../src/scripts');

/**
 * @param {string} name
 */
async function execScript(name) {
  const files = FS.readdirSync(dir);
  const file = files.find(f => name === Path.basename(f, Path.extname(f)));

  if (file) {
    await execShell(Path.join(dir, file));
  } else {
    console.error(
      `${name} is not a valid command. Valid commands are: ${files
        .map(f => Path.basename(f, Path.extname(f)))
        .join(', ')}`,
    );
    process.exit(1);
  }
}

exports.execScript = execScript;
