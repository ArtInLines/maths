const { findp, mean: getMean, stdDeviation, binom, pmf, cdf } = require('./binom');

class Binom {
	constructor({ n, step, p = null, mean = null, sigma = null }) {
		this.n = Number(n);
		this.step = step;
		this.p = p || findp({ n: this.n, mean });
		this.mean = mean || getMean({ n: this.n, p: this.p });
		this.sigma = sigma || stdDeviation({ n: this.n, p: this.p });
		this.vals = {};
	}

	getVal({ x }) {
		// TODO: First check if value has already been stored, as to save computation time
		return this.PDF({ x });
	}

	setVals() {
		this.vals = binom({ n: this.n, p: this.p, step: this.step });
	}

	getVals() {
		return this.vals;
	}

	get vals() {
		return this.vals;
	}

	get stdDeviation() {
		return this.sigma;
	}

	set stdDeviation({ x = null, n = null, p = null }) {
		x ? (this.sigma = x) : (this.sigma = stdDeviation({ n, p }));
	}

	get mu() {
		return this.mean;
	}

	set mu(x) {
		return (this.mean = Number(x));
	}

	get PDF({ x, n = this.n, p = this.p }) {
		return pmf({ n, p, x });
	}

	get CDF({ x, n = this.n, p = this.p, step = this.step }) {
		return cdf({ n, p, x });
	}
}

module.exports = Binom;
