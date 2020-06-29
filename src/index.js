/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import runParser from './parsers';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

export default (file1, file2) => {
  const getData1 = readFile(file1);
  const getData2 = readFile(file2);
  const obj1 = runParser(getData1);
  const obj2 = runParser(getData2);

  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = [...new Set([...key1, ...key2])];

  const result = [];
  for (const key of keys) {
    if (obj1[key] === obj2[key]) {
      result.push([' ', key, ': ', obj1[key]]);
    } else if (obj2.hasOwnProperty(key) !== true) {
      result.push(['-', key, ': ', obj1[key]]);
    } else if (obj1.hasOwnProperty(key) !== true) {
      result.push(['+', key, ': ', obj2[key]]);
    } else if (obj2.hasOwnProperty(key) === true
        && obj1[key] !== obj2[key]) {
      result.push(['+', key, ': ', obj2[key]]);
      result.push(['-', key, ': ', obj1[key]]);
    }
  }
  const arrToStr1 = result.map((el) => el.join(' '));
  const arrToStr2 = arrToStr1.join('\n');
  const final = `{\n${arrToStr2}\n}`;
  console.log(final);
  return final;
};
