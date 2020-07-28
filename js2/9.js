/**
 * Replicate Array.prototype.reduce and call it cReduce
 * Documentation:
 *     Replicate Array.prototype.reduce and call it cReduce
 */

const solution = () => {
  Array.prototype.cReduce = function (cb, acc, i = 0, result) {
    if (i === this.length) {
      return result
    }

    let condition = acc === undefined && acc !== "" && acc !== 0 && acc !== [] && acc !== {}
    if (condition) {
      result = cb(this[i], this[i + 1], i, this)
      return this.cReduce(cb, result, i + 2, result)
    }

    result = cb(acc, this[i], i, this)
    acc = result

    return this.cReduce(cb, acc, i + 1, result)
  }
}

module.exports = {
  solution
}
