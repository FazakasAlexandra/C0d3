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

function getColArr(col, colArr = []){
  if(colArr.length < col){
    colArr.push(0)
    return getColArr(col, colArr)
  }
  return colArr
}

const solution = (row, col, arr = []) => {
  if(arr.length < row){
    arr[arr.length] = getColArr(col)
    return solution(row, col, arr)
  }
  return arr
}

module.exports = {
  solution
}
