/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import runParser from './parsers';
import formatter from './stylish';
import makeDiff from './makeDiff';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const genDiff = (file1, file2) => {
  const getData1 = readFile(file1);
  const getData2 = readFile(file2);
  const obj1 = runParser(getData1, path.extname(file1));
  const obj2 = runParser(getData2, path.extname(file2));
  const gendiffFile = makeDiff(obj1, obj2);
  console.log(formatter(gendiffFile));
  return formatter(gendiffFile);
};

export default genDiff;
