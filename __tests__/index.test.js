import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let readFile;
let result;
let resultPlain;

beforeAll(() => {
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  result = readFile('resultTree.txt');
  resultPlain = readFile('plain.txt');
});

test('gendiff json', async () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('gendiff yaml', async () => {
  const before = getFixturePath('file1.yml');
  const after = getFixturePath('file2.yml');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('gendiff ini', async () => {
  const before = getFixturePath('file1.ini');
  const after = getFixturePath('file2.ini');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});

test('plain', async () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  const diff = genDiff(before, after, 'plain');
  expect(diff).toEqual(resultPlain);
});
