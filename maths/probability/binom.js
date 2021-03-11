module.exports = { pmf, pdf, cdf, cdfInterval, cdfMin, cdfMax, mean, stdDeviation, binom, findp };

const fact = require('../util/funcs');
const { percentToDecimal } = require('../util/transforms');

function mean({ n, p }) {
	return n * p;
}

function stdDeviation({ n, p }) {
	p = percentToDecimal({ p });
	return Math.sqrt(n * p * (1 - p));
}

function binom({ n, p, step = 1, begin = 0, end = n }) {
	const len = n * (1 / step) - begin - end;
	const res = new Array(len);
	for (let i = 0; i < len; i++) res[i] = pmf({ n: n, p: p, x: i * step });
	return res;
}

/**
 * Calculates the coefficient of the PMF of a binomial distribution. Mathematically: `n! / (x! + (n-x)!)`
 * @param {Number} n Number of Trials
 * @param {Number} x Number of successes
 * @return {Number}
 */
function coefficient({ n, x }) {
	return fact({ n }) / (fact({ n: x }) * fact({ n: n - x }));
}

/**
 * Calculate the Probability Mass function of a binomial distribution.
 * @param {(Number | String)} n Number of Trials
 * @param {(Number | String)} p Probability of success as float or percentage in string data form
 * @param {(Number | String)} x Number of successes
 * @param {(Number | String)} k `x = k`
 */
function pmf({ n, p, k = null, x = k }) {
	p = percentToDecimal({ p });
	x = Number(x);
	n = Number(n);
	return coefficient({ n, x }) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

/**
 * Calculate the Probability Density/Mass function of a binomial distribution.
 * @param {(Number | String)} n Number of Trials
 * @param {(Number | String)} p Probability of success as float or percentage in string data form
 * @param {(Number | String)} x Number of successes
 * @param {(Number | String)} k `x = k`
 */
function pdf({ n, p, k = null, x = k }) {
	return pmf({ n, p, x });
}

/**
 * `Mathematically: Fx(x) = P(X <= x)`
 */
function cdf({ n, p, x, step = 1 }) {
	x = Math.floor(x);
	let res = 0;
	while (x >= 0) {
		res += pmf({ n, p, x });
		x -= step;
	}
	return res;
}

function cdfMax({ n, p, x }) {
	return cdf({ n, p, x });
}

function cdfInterval({ n, p, start = 0, end = n, step = 1 }) {
	let res = 0;
	while (end >= start) {
		res += pmf({ n, p, x: end });
		end -= step;
	}
	return res;
}

function cdfMin({ n, p, x, step = 1 }) {
	let res = 0;
	while (x <= n) {
		res += pmf({ n, p, x });
		x += step;
	}
	return res;
}

function findp({ n = null, mean = null }) {
	mean = Number(mean);
	n = Number(n);
	if (mean && n) return mean / n;
}
