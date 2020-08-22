/**
 * Write a function called solution that
 *   takes in 2 parameters, a string and a function,
 *   returns the combined result of the function being called
 *     with every letter in the string
 * @param {string} str
 * @param {function} fun
 * @returns {string}
 */
/*
fun = (e) => {
  return '9'
}
result = solution('hello', fun) // "99999"

fun = (e) => {
  return e + '123'
}
result = solution('blah', fun) // "b123l123a123h123"
*/

const solution = (str, fun, result = '', i = 0) => {
  if(i === str.length || str === ""){
    return result
  }

  return solution(str, fun, result + fun(str[i]), i + 1)
}

module.exports = {
  solution
}