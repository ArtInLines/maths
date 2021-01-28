module.exports = { pmf, cdf, cdfInterval, cdfMin, expectedVal, stdDeviation, binom };

const fact = require('./factorial');
const { percentToDecimal } = require('./helper');

function expectedVal(n, p) {
	return n * p;
}

function stdDeviation({ n, p }) {
	p = percentToDecimal(p);
	return Math.sqrt(n * p * (1 - p));
}

/** @return {Number} */
function pmf({ n, p, x = null }) {
	p = percentToDecimal(p);
	x = Number(x);
	n = Number(n);
	return (fact(n) / (fact(x) * fact(n - x))) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

/**
 * `Fx(x) = P(X <= x)`
 */
function cdf({ n, p, x }) {
	let res = 0;
	while (x >= 0) {
		res += pmf({ n: n, p: p, x: x });
		x--;
	}
	return res;
}

function cdfInterval({ n, p, start, end }) {
	return cdf({ n: n, p: p, x: start }) - cdf({ n: n, p: p, x: end });
}

function cdfMin({ n, p, x }) {
	let res = 0;
	while (x <= n) {
		res += pmf({ n: n, p: p, x: x });
		x++;
	}
	return res;
}

function binom({ n, p, step = 1, begin = 0, end = n }) {
	const len = n * (1 / step) - begin - end;
	const res = new Array(len);
	for (let i = 0; i < len; i++) res[i] = pmf({ n: n, p: p, x: i * step });
	return res;
}

function findp({ n }) {}
