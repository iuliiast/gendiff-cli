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
  const iter = (tree, depth = 1) => {
    const formatType = (obj) => {
      switch (obj.type) {
        case 'parent': {
          const children = iter(obj.children, depth + 1);
          return `${makeIndent(depth + 1)}${obj.name}: ${children}`;
        }
        case 'added': {
          return `${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.value, depth + 1)}`;
        }
        case 'removed': {
          return `${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.value, depth + 1)}`;
        }
        case 'unchanged': {
          return `${makeIndent(depth)}  ${obj.name}: ${formatValue(obj.value, depth + 1)}`;
        }
        case 'updated': {
          return `${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.removedValue, depth + 1)}\n${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.addedValue, depth + 1)}`;
        }
        default:
          return 'Error with stylish';
      }
    };
    const formattedNodes = tree.map((el) => formatType(el));
    const result = formattedNodes.join('\n');
    return `{\n${result}\n${makeIndent(depth - 1)}}`;
  };
  return iter(tree);
};
export default stylish;
