/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';

//const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
//const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

export default (file1, file2) => {
  //const readJson1 = await readFile(file1);
  //const readJson2 = await readFile(file2);
  //const readJson1 = fs.readFileSync(path.resolve(process.cwd(), file1));
  //const readJson2 = fs.readFileSync(path.resolve(process.cwd(), file2));

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

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
  console.log('{\n', arrToStr2, '\n}');
};
