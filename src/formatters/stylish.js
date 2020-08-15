const formatValue = (value, depth = 1) => {
  const makeIndent = () => '  '.repeat(depth);
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const mappedKeys = keys.map((key) => `${key}: ${formatValue(value[key], depth + 1)}`);
    const result = mappedKeys.join(`\n${makeIndent(depth)}`);
    return `{\n${makeIndent(depth)}${result}\n${makeIndent(depth)}}`;
  }
  return `${value}`;
};

const stylish = (tree, depth = 1) => {
  const makeIndent = () => '  '.repeat(depth);
  const formatType = (obj) => {
    if (obj.type === 'parent') {
      const getChildren = stylish(obj.children, depth + 1);
      return `${makeIndent(depth + 1)}${obj.name}: ${getChildren}`;
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
  const mapped = tree.map((el) => formatType(el));
  const joinMap = mapped.join('\n');
  return `{\n${joinMap}\n${makeIndent(depth - 1)}}`;
};
export default stylish;
