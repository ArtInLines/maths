module.exports = factorial;

/**
 * Get the factorial of a number. Mathematically, this function is `n!`.
 * @param {Number} n Write parameters always as an object
 * @return {Number}
 */
function factorial({ n }) {
	n = Number(n);
	if (n === 1 || n === 0) return 1;
	return n * factorial({ n: n - 1 });
}
