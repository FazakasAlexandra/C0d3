/*
 * Write a function that takes in an object and a number (millieseconds).
 * - You must call each function value of the object {"nVal": (k) => {...}}
 * - {"nVal": (k) => {...When this function runs, k is "nVal"...}}
 * @param {object} obj
 * @param {number} num (millieseconds)
 * @call each function value of the object, millieseconds after each other
*/

const solution = (obj, num) => {
  Object.keys(obj).forEach((key, i) => {
    if(i === 0) {
      obj[key](key)
    } else {
      setTimeout(()=>{obj[key](key)}, num)
    }
  })
}

module.exports = {
  solution
}
