const binom = require('./maths/probability/binom');
const factorial = require('./maths/util/factorial');

// TODO: Add useful properties to the translation object, like help pages, etc.
// Maybe add these properties directly connected to the functions, or something

const obj = {
	// Useful operations
	fact: factorial,

	// Binomial Distribution Functions
	binom: { func: binom.binom, help: '' /* other useful properties */ },
	binomPMF: binom.pmf,
	binomCDF: binom.cdf,
	binomCDFMin: binom.cdfMin,
	binomInterval: binom.cdfInterval,
	binomMean: binom.mean,
	binomSigma: binom.stdDeviation,
	binomSTDDeviation: binom.stdDeviation,
	binomFindp: binom.findp,
};

module.exports = obj;
