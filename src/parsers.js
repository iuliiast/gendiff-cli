import yaml from 'js-yaml';
import ini from 'ini';

export default (filename, format) => {
  if (format === '.json') {
    return JSON.parse(filename);
  } if (format === '.yml') {
    return yaml.safeLoad(filename);
  } if (format === 'ini') {
    return ini.parse(filename);
  }
  return Error('Unknown format');
};
