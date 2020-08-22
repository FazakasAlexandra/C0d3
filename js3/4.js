/*
 * 2sum: write a function that takes in an array of numbers and a number, and returns true if any pairs add up to the number. (No duplicates)
 * @param {array} arr
 * @param {number} num
 * @returns {boolean}
 */

const solution = (arr, num, obj = {}, i = 0) => {
  if(i === arr.length){
    return false
  }
  if(obj[num-arr[i]]){
    return true
  }
  obj[arr[i]] = true
  return solution(arr, num, obj, i + 1)
}

module.exports = {
  solution
}
