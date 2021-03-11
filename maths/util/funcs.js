module.exports = { factorial };

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

/**
 * Summation function
 * @param {Number} n Number indicating the higher Bound (including n in the sum). Alternatively set via: `highBnd`. Defaults to `Infinity`
 * @param {Number} i Number indicating the lower Bound (getting increased by `step` each iteration). Alternatively set via: `lowBnd`. Defaults to 1.
 * @param {Number} step Number by which to increment `i` on each iteration. Defaults to 1.
 * @param {Number} f Function to be called with `i` as the first parameter and `params` as the other parameters. Alternatively set via: `func`
 * @param {Array} params Any other parameters to be put into `f`.
 */
function sum({ lowBnd = 1, highBnd = Infinity, func = (i) => i, i = lowBnd, step = 1, n = highBnd, f = func, params = [] }) {
	let res = 0;
	params = params.unshift(i);
	while (i <= n) {
		res += Function.apply(null, params);
		i += step;
	}
	return res;
}
