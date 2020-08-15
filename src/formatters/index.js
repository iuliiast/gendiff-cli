import stylish from './stylish';
import plainFormatter from './plain';
import jsonFormatter from './jsonFormatter';

export default (filename, format) => {
  if (format === 'stylish') {
    return stylish(filename);
  } if (format === 'plain') {
    return plainFormatter(filename);
  } if (format === 'json') {
    return jsonFormatter(filename);
  }
  return Error('Unknown format');
};
