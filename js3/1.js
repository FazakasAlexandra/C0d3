/**
 * given arr of strings (keys) and an object, return an array of values.
 * @param {array} arr {object} obj
 * @returns {array} arr
 */

const solution = (arr, obj, newArr = []) => {
  arr.forEach((el) => {
    if(obj[el]){
      newArr.push(obj[el])
    }
  })
  return newArr
}

module.exports = {
  solution
}
