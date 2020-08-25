import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export default (filename, format) => {
  if (format === '.json') {
    return JSON.parse(filename);
  }
  if (format === '.yml') {
    return yaml.safeLoad(filename);
  }
  if (format === '.ini') {
    const parsed = ini.parse(filename);
    const isNumeric = (value) => {
      const number = parseFloat(value);
      return !Number.isNaN(number);
    };
    const numberifyValue = (obj) => {
      const keys = Object.keys(obj);
      const getFormattedKey = (acc, key) => {
        if (_.isObject(obj[key])) {
          acc[key] = numberifyValue(obj[key]);
          return acc;
        }
        acc[key] = isNumeric(obj[key]) ? parseFloat(obj[key]) : obj[key];
        return acc;
      };
      const result = keys.reduce(getFormattedKey, {});
      return result;
    };
    return numberifyValue(parsed);
  }
  throw Error(`Unknown format: ${format}`);
};
