import stylish from './stylish';
import plainFormatter from './plain';
import jsonFormatter from './jsonFormatter';

export default (filename, format) => {
  let parse;
  if (format === 'stylish') {
    parse = stylish;
  } else if (format === 'plain') {
    parse = plainFormatter;
  } else if (format === 'json') {
    parse = jsonFormatter;
  } else {
    return Error('Unknown format');
  }
  return parse(filename);
};
