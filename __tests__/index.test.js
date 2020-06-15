import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('wrong format', async () => {
  const before = 'before.jpg';
  const after = 'after.jpg';
  const diff = genDiff(before, after);
  expect(diff).toEqual('Wrong format. Please check the validity of files.');
});

test('gendiff json', async () => {
  const before = await readFile('before.json');
  const after = await readFile('after.json');
  const result = await readFile('result.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('gendiff yaml', async () => {
  const before = await readFile('before.yml');
  const after = await readFile('after.yml');
  const result = await readFile('result.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});
