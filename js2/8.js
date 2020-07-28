/**
 * Replicate Array.prototype.map function and call it cMap
 * Documentation:
 *     https://www.w3schools.com/jsref/jsref_map.asp
 */

const solution = () => {
  Array.prototype.cMap = function (cb, i = 0, copyArr = []) {
    if(i === this.length){
      return copyArr
    }
    let el = cb(this[i], i, this)
    copyArr.push(el)
    return this.cMap(cb, i + 1, copyArr)
  }
}

module.exports = {
  solution
}
