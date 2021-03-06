/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import runParser from './parsers';
import format from './formatters/index';
import makeDiff from './makeDiff';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);
  const obj1 = runParser(data1, path.extname(filePath1).slice(1));
  const obj2 = runParser(data2, path.extname(filePath2).slice(1));
  const diff = makeDiff(obj1, obj2);
  return format(diff, formatName);
};

export default genDiff;
