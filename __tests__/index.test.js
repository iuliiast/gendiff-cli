import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let readFile;
let resultTree;
let resultPlain;

beforeAll(() => {
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  resultTree = readFile('tree.txt');
  resultPlain = readFile('plain.txt');
});

describe('generate diff', () => {
  test.each`
    exs       | filename1       | filename2       | expectedOutput
    ${'json'} | ${'file1.json'} | ${'file2.json'} | ${resultTree}
    ${'yaml'} | ${'file1.yml'}  | ${'file2.yml'}  | ${resultTree}
    ${'ini'}  | ${'file1.ini'}  | ${'file2.ini'}  | ${resultTree}
  `('generate difference between $exs format files',
  ({ filename1, filename2 }) => {
    expect(genDiff(getFixturePath(filename1), getFixturePath(filename2))).toEqual(resultTree);
  });
});

test('plain', async () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  const diff = genDiff(before, after, 'plain');
  expect(diff).toEqual(resultPlain);
});
