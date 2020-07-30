/* eslint-disable no-restricted-syntax */


const makeDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = [...new Set([...key1, ...key2])];

  const result = [];
  for (const key of keys) {
    if (obj1[key] === obj2[key]) {
      result.push({ name: key, value: obj1[key], type: 'unchanged' });
    } else if ((typeof obj2[key] !== 'object' && typeof obj1[key] !== 'object') && (obj2.hasOwnProperty(key) && obj1.hasOwnProperty(key))) {
      result.push({
        name: key, addedValue: obj2[key], removedValue: obj1[key], type: 'updated',
      });
    } else if (((typeof obj2[key] === typeof obj1[key]) !== true)
      && (obj2.hasOwnProperty(key) && obj1.hasOwnProperty(key))) {
      result.push({
        name: key, addedValue: obj2[key], removedValue: obj1[key], type: 'updated',
      });
    } else if (obj2.hasOwnProperty(key) !== true) {
      result.push({ name: key, value: obj1[key], type: 'removed' });
    } else if (obj1.hasOwnProperty(key) !== true) {
      result.push({ name: key, value: obj2[key], type: 'added' });
    } else if (typeof obj1[key] && typeof obj2[key] === 'object') {
      result.push({ name: key, children: makeDiff(obj1[key], obj2[key]), type: 'parent' });
    }
  }
  return result;
};
export default makeDiff;
