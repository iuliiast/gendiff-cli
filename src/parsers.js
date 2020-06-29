import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import ini from 'ini';

export default (filename) => {
  let parse;
  const format = path.extname(filename);
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else if (format === 'ini') {
    parse = ini.parse;
  } else console.log('Wrong format. Please check the validity of files.');
  parse(filename);
};
