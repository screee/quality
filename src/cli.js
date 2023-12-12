#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const {execScript} = require('./execScript');

execScript(process.argv[2] ?? '');
