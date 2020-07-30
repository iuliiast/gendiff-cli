const formatter = (tree) => {
  const formatValue = (value) => {
    let acc = '';
    if (typeof value === 'object') {
      const entries = Object.entries(value).flat();
      acc += `{\n${entries[0]}:${formatValue(entries[1])}\n}`;
    } else {
      acc += value;
    }
    return acc;
  };
  const formatType = (obj) => {
    const res = [];
    if (obj.type === 'parent') {
      const getChildren = formatter(obj.children);
      res.push(`${obj.name}: {\n${getChildren}\n}`);
    } else if (obj.type === 'removed') {
      res.push(`- ${obj.name}: ${formatValue(obj.value)}`);
    } else if (obj.type === 'added') {
      res.push(`+ ${obj.name}: ${formatValue(obj.value)}`);
    } else if (obj.type === 'unchanged') {
      res.push(`  ${obj.name}: ${formatValue(obj.value)}`);
    } else if (obj.type === 'updated') {
      res.push(`+ ${obj.name}: ${formatValue(obj.addedValue)}
      \n- ${obj.name}: ${formatValue(obj.removedValue)}`);
    }
    return res;
  };
  const mapped = tree.map((el) => formatType(el));
  const joinMap = mapped.join('\n');
  return `{\n${joinMap}\n}`;
};
export default formatter;
