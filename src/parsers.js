import yaml from 'js-yaml';
import ini from 'ini';

export default (filename, format) => {
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else if (format === 'ini') {
    parse = ini.parse;
  } else {
    return Error('Unknown format');
  }
  return parse(filename);
};
