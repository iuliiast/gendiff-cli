const formatter = (file) => {
  let result = '';

  const checkValue = (obj) => {
    if (typeof obj.value === 'object') {
      const entries = (Object.entries(obj.value)).flat();
      const createFormWithObj = `{\n ${entries[0]} : ${entries[1]} \n }`;
      return createFormWithObj;
    }
    return obj.value;
  };

  const operator = (obj) => {
    let str = '';
    if (obj.type === 'removed') {
      str += `\n - ${obj.name} : ${checkValue(obj)}`;
    } else if (obj.type === 'added') {
      str += `\n + ${obj.name} : ${checkValue(obj)}`;
    } else if (obj.type === 'unchanged') {
      str += `\n   ${obj.name} : ${checkValue(obj)}`;
    } else if (obj.type === 'updated') {
      str += `\n + ${obj.name} : ${obj.addedValue}`;
      str += `\n - ${obj.name} : ${obj.removedValue}`;
    }
    return str;
  };

  for (const obj of file) {
    if (obj.type === 'parent') {
      const getChildren = formatter(obj.value);
      const objName = `\n ${obj.name}: ${getChildren} \n}`;
      result += objName;
    } else {
      const createForm = `${operator(obj)}`;
      result += createForm;
    }
  }
  const fin = `{\n ${result} \n}`;
  return fin;
};
export default formatter;
