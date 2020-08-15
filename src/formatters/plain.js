const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainFormatter = (tree, pathStr) => {
  const makePath = (str) => {
    const result = [pathStr];
    result.push(str);
    if (pathStr === '') {
      return result.join('');
    }
    return result.join('.');
  };

  const formatType = (obj) => {
    const { name } = obj;
    const res = [];
    if (obj.type === 'parent') {
      const getChildren = plainFormatter(obj.children, makePath(name));
      res.push(`${getChildren}`);
    } else if (obj.type === 'removed') {
      res.push(`Property '${makePath(name)}' was removed`);
    } else if (obj.type === 'added') {
      res.push(`Property '${makePath(name)}' was added with value: ${formatValue(obj.value)}`);
    } else if (obj.type === 'updated') {
      res.push(`Property '${makePath(name)}' was updated. From ${formatValue(obj.removedValue)} to ${formatValue(obj.addedValue)}`);
    }
    return res;
  };
  const mapped = tree.map((el) => formatType(el));
  const joinMap = mapped.join('\n');
  return joinMap;
};
export default plainFormatter;
