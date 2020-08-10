const formatValue = (value, depth = 1) => {
  const makeIndent = () => '  '.repeat(depth);
  let acc = [];
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    keys.map((key) => {
      depth += 1;
      acc.push(`{\n${makeIndent(depth)}${key}: ${formatValue(value[key], depth + 1)}\n${makeIndent(depth)}}`);
    });
  } else {
    acc += value;
  }
  return acc;
};

const stylish = (tree, depth = 1) => {
  const makeIndent = () => '  '.repeat(depth);

  const formatType = (obj) => {
    const res = [];
    if (obj.type === 'parent') {
      const getChildren = stylish(obj.children, depth + 1);
      res.push(`${makeIndent(depth + 1)}${obj.name}: ${getChildren}`);
    } else if (obj.type === 'added') {
      res.push(`${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.value, depth + 1)}`);
    } else if (obj.type === 'removed') {
      res.push(`${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.value, depth + 1)}`);
    } else if (obj.type === 'unchanged') {
      res.push(`${makeIndent(depth)}  ${obj.name}: ${formatValue(obj.value, depth + 1)}`);
    } else if (obj.type === 'updated') {
      res.push(`${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.removedValue, depth + 1)}\n${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.addedValue, depth + 1)}`);
    }
    return res;
  };
  const mapped = tree.map((el) => formatType(el));
  const joinMap = mapped.join('\n');
  return `{\n${joinMap}\n${makeIndent(depth - 1)}}`;
};
export default stylish;
