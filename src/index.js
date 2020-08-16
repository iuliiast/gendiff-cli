/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import runParser from './parsers';
import formatter from './formatters/index';
import makeDiff from './makeDiff';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);
  const obj1 = runParser(data1, path.extname(filePath1));
  const obj2 = runParser(data2, path.extname(filePath2));
  const gendiffFile = makeDiff(obj1, obj2);
  return formatter(gendiffFile, format);
};

export default genDiff;
