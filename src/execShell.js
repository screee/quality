/* eslint-disable @typescript-eslint/no-require-imports */

const {spawn} = require('child_process');

/**
 * @param {string} input
 * @returns
 */
async function execShell(input) {
  return new Promise(resolve => {
    const child = spawn(input, {
      shell: true,
      stdio: 'inherit',
      env: {PATH: `./node_modules/.bin:${process.env.PATH}`},
    });
    child.on('close', code => {
      if (code === 0) resolve(code);
      else process.exit(code ?? 1);
    });
  });
}

exports.execShell = execShell;
