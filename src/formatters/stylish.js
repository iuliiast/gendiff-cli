import _ from 'lodash';

const makeIndent = (depth) => '  '.repeat(depth);

const formatValue = (value, depth = 1) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const formattedKeys = keys.map((key) => `${key}: ${formatValue(value[key], depth + 2)}`);
    const result = formattedKeys.join(`\n${makeIndent(depth + 2)}`);
    return `{\n${makeIndent(depth + 2)}${result}\n${makeIndent(depth)}}`;
  }
  return value;
};

const buildNested = (tree) => {
  const iter = (diff, depth = 1) => {
    const getFormattedNode = (node) => {
      switch (node.type) {
        case 'parent': {
          const nested = iter(node.children, depth + 2);
          return `${makeIndent(depth + 1)}${node.name}: ${nested}`;
        }
        case 'added': {
          return `${makeIndent(depth)}+ ${node.name}: ${formatValue(node.value, depth + 1)}`;
        }
        case 'removed': {
          return `${makeIndent(depth)}- ${node.name}: ${formatValue(node.value, depth + 1)}`;
        }
        case 'unchanged': {
          return `${makeIndent(depth)}  ${node.name}: ${formatValue(node.value, depth + 1)}`;
        }
        case 'updated': {
          return `${makeIndent(depth)}- ${node.name}: ${formatValue(node.removedValue, depth + 1)}\n${makeIndent(depth)}+ ${node.name}: ${formatValue(node.addedValue, depth + 1)}`;
        }
        default:
          throw Error(`Unknown type: ${node.type}`);
      }
    };
    const formattedNodes = diff.map((el) => getFormattedNode(el));
    const result = formattedNodes.join('\n');
    return `{\n${result}\n${makeIndent(depth - 1)}}`;
  };
  return iter(tree);
};
export default buildNested;
