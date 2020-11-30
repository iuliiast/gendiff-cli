import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
let resultTree;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultTree = readFile('tree.txt');
  resultPlain = readFile('plain.txt');
  resultJson = readFile('json.txt');
});

const extensionsList = ['json', 'yml', 'ini'];
test.each(extensionsList)('generate diff %s', (extension) => {
  const before = getFixturePath(`file1.${extension}`);
  const after = getFixturePath(`file2.${extension}`);
  expect(genDiff(before, after, 'stylish')).toEqual(resultTree);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});
