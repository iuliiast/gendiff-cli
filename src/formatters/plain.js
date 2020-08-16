const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainFormatter = (tree) => {
  const makePath = (pathname) => {
    const result = [];
    result.push(pathname);
    return result.join('.');
  };

  const formatType = (node) => {
    const { name } = node;
    if (node.type === 'parent') {
      const children = plainFormatter(node.children, makePath(name));
      return `${children}`;
    } if (node.type === 'removed') {
      return `Property '${makePath(name)}' was removed`;
    } if (node.type === 'added') {
      return `Property '${makePath(name)}' was added with value: ${formatValue(node.value)}`;
    } if (node.type === 'updated') {
      return `Property '${makePath(name)}' was updated. From ${formatValue(node.removedValue)} to ${formatValue(node.addedValue)}`;
    }
  };
  const formattedNodes = tree.map((el) => formatType(el));
  const result = formattedNodes.join('\n');
  return result;
};
export default plainFormatter;


/*
  const makePath = (str) => {
    const result = [pathStr];
    result.push(str);
    if (pathStr === '') {
      return result.join('');
    }
    return result.join('.');
  };
*/
