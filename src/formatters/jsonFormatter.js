const formatValue = (value) => {
  let acc = '';
  if (typeof value === 'object') {
    const entries = Object.entries(value).flat();
    acc += `{${entries[0]}:${formatValue(entries[1])}}`;
  } else {
    acc += value;
  }
  return acc;
};

const jsonFormatter = (tree) => {
  const formatType = (obj) => {
    const { name } = obj;
    const res = [];
    if (obj.type === 'parent') {
      const getChildren = jsonFormatter(obj.children);
      res.push(`${name}:${getChildren}`);
    } else if (obj.type === 'removed') {
      res.push(`"${name}":${formatValue(obj.value)}`);
    } else if (obj.type === 'added') {
      res.push(`"${name}":${formatValue(obj.value)}`);
    } else if (obj.type === 'updated') {
      res.push(`"${name}":${formatValue(obj.addedValue)},"${name}":${formatValue(obj.removedValue)}`);
    }
    return res;
  };
  const mapped = tree.flatMap((el) => formatType(el));
  const joinMap = mapped.join(',');
  return `[{${joinMap}}]`;
};
export default jsonFormatter;
