import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export default (filename) => {
  let parse;
  const format = path.extname(filename);
  const data = readFile(getFixturePath(filename), 'utf-8');
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else console.log('Wrong format. Please check the validity of files.');
  parse(data);
};
