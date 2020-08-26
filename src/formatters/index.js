import stylish from './stylish';
import plainFormatter from './plain';

export default (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plainFormatter(diff);
  }
  if (format === 'json') {
    return JSON.stringify(diff);
  }
  throw Error(`Unknown format: ${format}`);
};
