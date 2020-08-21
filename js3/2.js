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
  if(arr.length < num2){
    arr.push({x: arr.length, y: arrNumber})
    return insertObjects(arr, num2, arrNumber)
  }
  return
}

const solution = (num1, num2, Arr = []) => {
  if(Arr.length < num1){
    Arr.push([])
    return solution(num1, num2, Arr)
  }

  Arr.forEach((e, i)=>{
    insertObjects(e, num2, i)
  })

  return Arr
}

module.exports = {
  solution
}
