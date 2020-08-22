/**
 * takes in 2 integers, create 2d array of objects. First integer represents how many nested arrays within the array. Second integer represents how many objects within each array.
 * solution(4,2)
 * returns:
 * [
    [{x: 0, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}],
    [{x: 0, y: 3}, {x: 1, y: 3}],
  ]
 * @param {integer} num1 {integer} num2
 * @return {array} arr
 */

function insertObjects(arr, num2, arrNumber){
  if(arr[arrNumber].length < num2){
    arr[arrNumber].push({x: arr[arrNumber].length, y: arrNumber})

    return insertObjects(arr, num2, arrNumber)
  }
  
  return
}

const solution = (num1, num2, arr = []) => {
  if(arr.length < num1){
    arr.push([])
    insertObjects(arr, num2, arr.length - 1)

    return solution(num1, num2, arr)
  }

  return arr
}

module.exports = {
  solution
}
