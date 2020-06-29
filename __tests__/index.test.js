import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

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

test('gendiff ini', async () => {
  const before = await readFile('before.ini');
  const after = await readFile('after.ini');
  const result = await readFile('result.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('tree', async () => {
  const before = await readFile('file1.json');
  const after = await readFile('file2.json');
  const result = await readFile('resultTree.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});
