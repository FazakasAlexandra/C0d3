/**
 * Replicate Array.prototype.reduce and call it cReduce
 * Documentation:
 *     Replicate Array.prototype.reduce and call it cReduce
 */

const solution = () => {
  Array.prototype.cReduce = function (cb, acc, i = 0) {
    if (i === this.length) {
      return acc
    }

    if (acc === undefined) {
      acc = cb(this[i], this[i + 1], i, this)
      return this.cReduce(cb, acc, i + 2)
    }

    acc = cb(acc, this[i], i, this)

    return this.cReduce(cb, acc, i + 1)
  }
}

module.exports = {
  solution
}
