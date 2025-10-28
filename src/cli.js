#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const {execScript} = require('./execScript');

execScript(process.argv[2] ?? '');
