import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', async () => {
  const before = await readFile('before.json');
  const after = await readFile('after.json');
  const result = await readFile('result.txt');
  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});
