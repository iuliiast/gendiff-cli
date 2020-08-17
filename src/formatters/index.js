import stylish from './stylish';
import plainFormatter from './plain';

export default (filename, format) => {
  if (format === 'stylish') {
    return stylish(filename);
  } if (format === 'plain') {
    return plainFormatter(filename);
  } if (format === 'json') {
    return JSON.stringify(filename);
  }
  return Error('Unknown format');
};
