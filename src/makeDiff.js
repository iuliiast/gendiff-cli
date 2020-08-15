/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);

  const createDiff = (key) => {
    if ((!_.isObject(obj2[key]) && !_.isObject(obj1[key]))
    && (_.has(obj2, key) && _.has(obj1, key))) {
      return { name: key, addedValue: obj2[key], removedValue: obj1[key], type: 'updated' };
    } if (((typeof obj2[key] === typeof obj1[key]) !== true)
    && (_.has(obj2, key) && _.has(obj1, key))) {
      return { name: key, addedValue: obj2[key], removedValue: obj1[key], type: 'updated' };
    } if (!_.has(obj2, key)) {
      return { name: key, value: obj1[key], type: 'removed' };
    } if (!_.has(obj1, key)) {
      return { name: key, value: obj2[key], type: 'added' };
    } if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, children: makeDiff(obj1[key], obj2[key]), type: 'parent' };
    } if (obj1[key] === obj2[key]) {
      return { name: key, value: obj1[key], type: 'unchanged' };
    }
  };
  const formattedNodes = keys.map((key) => createDiff(key));
  return formattedNodes;
};
export default makeDiff;
