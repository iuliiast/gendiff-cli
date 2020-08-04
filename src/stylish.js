const formatValue = (value, depth = 1) => {
  const makeIndent = (depth) => '  '.repeat(depth);
  let acc = '';
  if (typeof value === 'object') {
    const entries = Object.entries(value).flat();
    acc += `{\n${makeIndent(depth)}${entries[0]}: ${formatValue(entries[1])}\n${makeIndent(depth)}}`;
  } else {
    acc += value;
  }
  return acc;
};

const formatter = (tree, depth = 1) => {

  const makeIndent = (depth) => '  '.repeat(depth);

  const formatType = (obj) => {
    const res = [];
    if (obj.type === 'parent') {
      const getChildren = formatter(obj.children, depth + 1);
      res.push(`${makeIndent(depth)}${obj.name}: {\n${getChildren}\n${makeIndent(depth)}}`);
    } else if (obj.type === 'removed') {
      res.push(`${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.value, depth + 1)}`);
    } else if (obj.type === 'added') {
      res.push(`${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.value, depth + 1)}`);
    } else if (obj.type === 'unchanged') {
      res.push(`${makeIndent(depth)}  ${obj.name}: ${formatValue(obj.value, depth + 1)}`);
    } else if (obj.type === 'updated') {
      res.push(`${makeIndent(depth)}+ ${obj.name}: ${formatValue(obj.addedValue, depth + 1)}\n${makeIndent(depth)}- ${obj.name}: ${formatValue(obj.removedValue, depth + 1)}`);
    }
    return res;
  };
  const mapped = tree.map((el) => formatType(el));
  const joinMap = mapped.join('\n');
  return joinMap;
};
export default formatter;
