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
  expect(genDiff(getFixturePath(`file1.${extension}`), getFixturePath(`file2.${extension}`), 'stylish')).toEqual(resultTree);
  expect(genDiff(getFixturePath(`file1.${extension}`), getFixturePath(`file2.${extension}`), 'plain')).toEqual(resultPlain);
  expect(genDiff(getFixturePath(`file1.${extension}`), getFixturePath(`file2.${extension}`), 'json')).toEqual(resultJson);
});
