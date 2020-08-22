/*
 * Given object of key: string values and an object of key: function values, call the functions in 2nd object, using the values in 1st object as function params
 * @param {object} obj1
 * @param {object} obj2
 * @return {object}
 **/

const solution = (a, b) => {
  return Object.keys(a).reduce((acc, key) => {
    acc[key] = b[key] ? b[key](a[key]) : a[key]
    return acc
  }, {})
}
module.exports = {
  solution
}
