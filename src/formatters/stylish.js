import _ from 'lodash';

const makeIndent = (depth) => '  '.repeat(depth);

const formatValue = (value, depth = 1) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const formattedKeys = keys.map((key) => `${key}: ${formatValue(value[key], depth + 1)}`);
    const result = formattedKeys.join(`\n${makeIndent(depth)}`);
    return `{\n${makeIndent(depth)}${result}\n${makeIndent(depth)}}`;
  }
  return value;
};

const stylish = (tree) => {
  const depth = 1;
  const formatType = (obj) => {
    if (obj.type === 'parent') {
      const children = stylish(obj.children, depth + 1);
      return `${makeIndent(depth + 1)}${obj.name}: ${children}`;
    } if (obj.type === 'added') {
      return `${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.value, depth + 1)}`;
    } if (obj.type === 'removed') {
      return `${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.value, depth + 1)}`;
    } if (obj.type === 'unchanged') {
      return `${makeIndent(depth)}  ${obj.name}: ${formatValue(obj.value, depth + 1)}`;
    } if (obj.type === 'updated') {
      return `${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.removedValue, depth + 1)}\n${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.addedValue, depth + 1)}`;
    }
  };
  const formattedNodes = tree.map((el) => formatType(el));
  const result = formattedNodes.join('\n');
  return `{\n${result}\n${makeIndent(depth - 1)}}`;
};
export default stylish;
