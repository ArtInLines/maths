module.exports = { percentToDecimal };

/**
 * Transforms stringified numbers to numbers and (stringified) percentages to decimals
 * @param {String | Number} p The probability either as a stringified number or a number.
 * @return {Number} Any number (usually a decimal) or Error upon non-number input.
 */
function percentToDecimal(p) {
	if (typeof p === 'string') {
		if (p.split('')[p.length - 1] === '%') p = Number(p.slice(0, -1)) / 100;
		p = Number(p);
	} else if (typeof p !== 'number') throw new TypeError('Invalid percent: the input "p" must be of the "number" data type');
	return p;
}
