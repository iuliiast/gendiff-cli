const formatter = (file) => {
  let result = '';
  const operator = (obj) => {
    let str = '';
    if (obj.type === 'removed') {
      str += `\n - ${obj.name}`;
    } else if (obj.type === 'added' || obj.type === 'updated') {
      str += `\n + ${obj.name}`;
    } else if (obj.type === 'unchanged') {
      str += `\n   ${obj.name}`;
    }
    return str;
  };
  for (const obj of file) {
    if (Array.isArray(obj.value)) {
      const getArray = formatter(obj.value);
      const objName = `\n ${obj.name}: ${getArray} \n}`; 
      result += objName;
    } else if (((typeof obj.value === 'object') !== true) && ((Array.isArray(obj.value)) !== true)) {
      const createForm = `${operator(obj)} : ${obj.value}`;
      result += createForm;
    } else if (typeof obj.value === 'object') {
      const entries = (Object.entries(obj.value)).flat();
      const createFormWithObj = `\n ${operator(obj)} : {\n ${entries[0]} : ${entries[1]} \n }`;
      result += createFormWithObj;
    }
  }
  const addWrapper = `{\n ${result} \n}`;
  return addWrapper;
};
export default formatter;
