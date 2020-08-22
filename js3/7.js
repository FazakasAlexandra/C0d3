/*
 * write a map function for objects
 * @param {callback} cb
 * @returns {number}
*/

const solution = () => {
  Object.prototype.map = function (cb) {
      return Object.keys(this).map((key, i) => {
         return cb(key, this[key], i)
      })
  }
}

module.exports = {
  solution
}
