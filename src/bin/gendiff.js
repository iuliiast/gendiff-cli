#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((before, after) => genDiff(before, after));

program.parse(process.argv);