const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildPlain = (tree) => {
  const iter = (diff, paths = []) => {
    const getFormattedNode = (node) => {
      const newPaths = [...paths, node.name];
      const fullPath = newPaths.join('.');
      switch (node.type) {
        case 'parent': {
          const nested = iter(node.children, newPaths);
          return nested;
        }
        case 'removed': {
          return `Property '${fullPath}' was removed`;
        }
        case 'added': {
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
        }
        case 'updated': {
          return `Property '${fullPath}' was updated. From ${formatValue(node.removedValue)} to ${formatValue(node.addedValue)}`;
        }
        default:
          throw Error(`Unknown type: ${node.type}`);
      }
    };
    const formattedNodes = diff.filter((el) => el.type !== 'unchanged')
      .map((el) => getFormattedNode(el));
    const result = formattedNodes.join('\n');
    return result;
  };
  return iter(tree);
};
export default buildPlain;
