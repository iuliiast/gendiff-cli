/* eslint-disable no-restricted-syntax */
const formatter = (file) => {
  let result = '';

  const formatValue = (value) => {
    let acc = '';
    if (typeof value !== 'object') {
      console.log(value);
      acc += value;
    } else {
      const values = Object.values(value);
      console.log(values);
      formatValue(values);
    }
    return acc;
  };

  for (const obj of file) {

    if (obj.type === 'parent') {
      const getChildren = formatter(obj.value);
      const objName = `\n ${obj.name}: ${getChildren} \n}`;
      result += objName;
    } else if (obj.type === 'removed') {
      result += `\n - ${obj.name} : ${formatValue(obj.value)}`;
    } else if (obj.type === 'added') {
      result += `\n + ${obj.name} : ${formatValue(obj.value)}`;
    } else if (obj.type === 'unchanged') {
      result += `\n   ${obj.name} : ${formatValue(obj.value)}`;
    } else if (obj.type === 'updated') {
      result += `\n + ${obj.name} : ${formatValue(obj.addedValue)}`;
      result += `\n - ${obj.name} : ${formatValue(obj.removedValue)}`;
    }
  }
  const getWrapper = `{\n ${result} \n}`;
  return getWrapper;
};
export default formatter;
