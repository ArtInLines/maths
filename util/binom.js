module.exports = { pdf, cdfMin, cdfMax };

const fact = require('./factorial');

function percentToDecimal(p) {
	if (typeof p === 'string') {
		if (p.split('')[p.length - 1] === '%') p = Number(p.slice(0, -1)) / 100;
		p = Number(p);
	}
	return p;
}

function expectedVal(n, p) {
	return n * p;
}

function stdDeviation({ n, p }) {
	p = percentToDecimal(p);
	return Math.sqrt(n * p * (1 - p));
}

function pdf({ n, p, x }) {
	p = percentToDecimal(p);
	x = Number(x);
	n = Number(n);
	return (fact(n) / (fact(x) * fact(n - x))) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function cdfMin({ n, p, x }) {
	let res = 0;
	while (x >= 0) {
		res += pdf({ n: n, p: p, x: x });
		x--;
	}
	return res;
}

function cdfMax({ n, p, x }) {
	let res = 0;
	while (x <= n) {
		res += pdf({ n: n, p: p, x: x });
		x++;
	}
	return res;
}
