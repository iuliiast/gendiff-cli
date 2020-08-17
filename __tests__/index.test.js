import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff json', async () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  const result = await readFile('resultTree.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('gendiff yaml', async () => {
  const before = getFixturePath('file1.yml');
  const after = getFixturePath('file2.yml');
  const result = await readFile('result.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('gendiff ini', async () => {
  const before = getFixturePath('file1.ini');
  const after = getFixturePath('file2.ini');
  const result = await readFile('result.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('plain', async () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  const result = await readFile('plain.txt');
  const diff = genDiff(before, after, 'plain');
  expect(diff).toEqual(result);
});
