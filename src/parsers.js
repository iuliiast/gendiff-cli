import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumeric = (value) => {
  const number = parseFloat(value);
  return !Number.isNaN(number);
};

export default (content, extension) => {
  const format = extension.substr(1);
  if (format === 'json') {
    return JSON.parse(content);
  }
  if (format === 'yml') {
    return yaml.safeLoad(content);
  }
  if (format === 'ini') {
    const parsed = ini.parse(content);
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
