/**
 * Write a function called solution that
 *   Takes in 2 numbers and
 *   returns an array with the length equal to the first input number.
 *     Every element in the returned array is an array,
 *        with length equal to  the second input number.
 *     All values in the array is 0.
 * @param {number} row
 * @param {number} col
 * @returns {array}
 */

const solution = (row, col, rowArr=[], colArr=[], i = 0, j = 0) => {
  if(i < row){
    if(j < col) {
      colArr.push(0)
      return solution(row, col, rowArr, colArr, i, j + 1)
    }
    rowArr.push(colArr)
    return solution(row, col, rowArr, colArr, i + 1, j)
  }
  return rowArr
}

module.exports = {
  solution
}
