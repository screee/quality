#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const {execScript} = require('./execScript');

// TODO add help command
const command = process.argv[2];
execScript(command);
