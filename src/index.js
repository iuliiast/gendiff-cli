/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import runParser from './parsers';
import formatter from './stylish';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const genDiff = (file1, file2) => {
  const getData1 = readFile(file1);
  const getData2 = readFile(file2);
  const obj1 = runParser(getData1, path.extname(file1));
  const obj2 = runParser(getData2, path.extname(file2));

  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = [...new Set([...key1, ...key2])];

  const result = [];
  for (const key of keys) {
    if (file1[key] === file2[key]) {
      result.push({ name: key, value: file1[key], type: 'unchanged' });
    } else if ((typeof file2[key] !== 'object' && typeof file1[key] !== 'object') && (file2.hasOwnProperty(key) && file1.hasOwnProperty(key))) {
      result.push({
        name: key, addedValue: file2[key], removedValue: file1[key], type: 'updated',
      });
    } else if (((typeof file2[key] === typeof file1[key]) !== true)
    && (file2.hasOwnProperty(key) && file1.hasOwnProperty(key))) {
      result.push({
        name: key, addedValue: file2[key], removedValue: file1[key], type: 'updated',
      });
    } else if (file2.hasOwnProperty(key) !== true) {
      result.push({ name: key, value: file1[key], type: 'removed' });
    } else if (file1.hasOwnProperty(key) !== true) {
      result.push({ name: key, value: file2[key], type: 'added' });
    } else if (typeof file1[key] && typeof file2[key] === 'object') {
      result.push({ name: key, value: gendiff(file1[key], file2[key]), type: 'parent' });
    }
  }
  console.log(formatter(result));
  return formatter(result);
};

export default genDiff;
