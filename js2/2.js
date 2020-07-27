/**
 * Write a function called solution that
 *   Takes in a function and returns an array.
 *
 * As long as the input function returns false,
 *   array keeps growing with the correspending index value
 * @param {function} fun
 * @returns {array}
 */

const solution = (fun, i = 0, array = []) => {
  if(!fun(i)){
    array.push(i)
    return solution(fun, i + 1, array)
  }
  if(fun(i)){
    return array
  }
}

module.exports = {
  solution
}
