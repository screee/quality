const FS = require('fs');
const Path = require('path');
const {execShell} = require('./execShell');

/**
 * @param {string} name
 */
async function execScript(name) {
  const files = FS.readdirSync('./src/scripts');
  const file = files.find(f => name === Path.basename(f, Path.extname(f)));

  if (file) {
    await execShell(`./src/scripts/${file}`);
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
