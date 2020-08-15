/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import runParser from './parsers';
import formatter from './formatters/index';
import makeDiff from './makeDiff';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const genDiff = (filename1, filename2, defaultFormat) => {
  const data1 = readFile(filename1);
  const data2 = readFile(filename2);
  const obj1 = runParser(data1, path.extname(filename1));
  const obj2 = runParser(data2, path.extname(filename2));
  const gendiffFile = makeDiff(obj1, obj2);
  return formatter(gendiffFile, defaultFormat);
};

export default genDiff;
