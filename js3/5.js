/*
 * Given object of key: string values and an object of key: function values, call the functions in 2nd object, using the values in 1st object as function params
 * @param {object} obj1
 * @param {object} obj2
 * @return {object}
 **/

const solution = (a, b, c = {}) => {
  Object.keys(a).forEach(key => {
    if(b[key]){
      c[key] = b[key](a[key])
    } else {
      c[key] = a[key]
    }
  })
  
  return c
}
module.exports = {
  solution
}
