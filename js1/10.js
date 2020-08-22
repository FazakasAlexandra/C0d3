/**
 * Write a function called solution that
 *   takes in 2 parameters, a string and a function,
 *   and returns a function.
 *  When the returned function is called for the first time,
 *    the input function will be called with the first letter of the string.
 *  When the returned function is called for the second time,
 *    the input function will be called with the second letter of the string.
 *  When the returned function is called for the third time,
 *    the input function will be called with the third letter of the string.
 *  ...
 *  When the returned function is called with the last letter of the string,
 *    calling it again will call the input function with the first letter
 *    of the string and start over.
 * @param {string} str
 * @param {function} fun
 * @returns {function}
 * 
fun = solution('hel2', (e) => {
  console.log(e)
})
fun() // prints-> 'h'
fun() // prints-> 'e'
fun() // prints-> 'l'
fun() // prints-> '2'
fun() // prints-> 'h'
fun() // prints-> 'e'
 */

const solution = (str, fun, i = 0) => {
  return () => {
    fun(str[i % str.length])
    i++
   }
}

module.exports = {
  solution
}
