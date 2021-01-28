module.exports = factorial;

/**
 * Get the factorial of a number. mathematically, this function is `n!`.
 * @param {Number} n
 * @return {Number}
 */
function factorial(n) {
	if (n === 1 || n === 0) return 1;
	return n * factorial(n - 1);
}
