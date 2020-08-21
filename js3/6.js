/*
 * write a function that takes in an array of numbers, and returns a new array of all duplicate numbers
 * @param {array} arr
 * @returns {array}
*/

const solution = (arr, duplicates = [], obj = []) => {
  arr.forEach(e => {
    if(obj[e] && obj[e].occurences === 1){
      duplicates.push(e)
      obj[e].occurences += 1
    } else {
      obj[e] = {occurences : 1}
    }
  });
  return duplicates
}

module.exports = {
  solution
}
