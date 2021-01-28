const binom = require('./util/binom');
const factorial = require('./util/factorial');

module.exports = {
	// Binom functions
	binom: binom.binom,
	binomPMF: binom.pmf,
	binomCDF: binom.cdf,
	binomCDFMin: binom.cdfMin,
	binomInterval: binom.cdfInterval,
	binomMean: binom.mean,
	binomDev: binom.stdDeviation,
	binomFindp: binom.findp,

	// Useful operations
	fact: factorial,
};
