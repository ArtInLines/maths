module.exports = { strArrToStr, strSplitToStr, funcToStr, strToFunc, fToFunc, percentToDecimal, strToVal, strSplitToStrOnce, strSplitOnce, strSplitOnceRight };

/* 
 * Shorthand names used in method names:

 * f === Mathematical function
 * bin === Binary
 * func === JS Function
 * str === JS String
 * num === JS Number
 * arr === JS Array
 * ...Arr === JS Array of ...
 * obj === JS Object
 */

/**
 * Transform a string representation of a value into the corresponding JS value.
 * ```
 * '"x"' || "'x'" => 'x'
 * 'false' => false
 * '1' => 1
 * 'null' => null
 *
 * 'Non-Primitives':
 * '["x", y,3, false]' => ['x', 'y', 3, false]
 * '{ x: true, "y":5,"foo": "bar"}' => { x: true, y: 5, foo: "bar"}
 * ```
 * Other non-primitives like functions, maps or sets are not yet implemented.
 * @param {String} str String to transform into its JS value
 * @param {Boolean} [nonPrimitive=true] Indicates whether to check for non-primitive values too. Primitive values are counted here as strings, numbers and booleans, while other values such as arrays are counted as non-primitive. Defaults to `true`. Set to `false` if you know the value is primitive.
 * @param {Boolean} [replace=true] Only important for non-primitive values with unique keys such as JS Objects. If replace is set to `false`, duplicate keys do not overwrite each other's values, instead a duplicate key would then add a new value pair with the key `<key>_<number of duplicate>`. For example: `"{foo: bar, foo: 3, foo}" => {foo: "bar", foo_1: 3, foo_2: null}`
 */
function strToVal(str, nonPrimitive = true, replace = true) {
	str = strSplitToStr(str, ' ');

	// Check if str is a Boolean
	if (str === 'false') return false;
	if (str === 'true') return true;
	if (str === 'null') return null;

	// Check if str is a number
	{
		n = Number(str);
		if (!isNaN(n)) return n;
	}

	// Only check for nonPrimitives, if required
	if (nonPrimitive) {
		// Check if str is an array
		if (str.charAt(0) === '[') {
			str = str.slice(1, -1);
			return str.split(',').map((val) => strToVal(val, nonPrimitive, replace));
		}

		// Check if str is an object
		if (str.charAt(0) === '{') {
			str = str.slice(1, -1);
			const obj = {};
			let vals = str.split(',').map((val) => val.split(':'));
			vals.forEach((val) => {
				if (!Array.isArray(val)) val = [val, null];
				if (!replace) {
					let i = 0;
					while (obj.hasOwnProperty(val[0])) {
						val[0] = `${val[0]}_${i}`;
						i++;
					}
				}
				obj[val[0]] = strToVal(val[1], nonPrimitive, replace);
			});
			return obj;
		}
	}

	// Return as string
	return strSplitToStr(str, '"', "'");
}

/**
 * Concatenate strings (stored in an array) to a single string. No commas between former entries of the array. If you want commas between the values, use `array.toString()` instead.
 * @param {String[]} arr Array of strings to concatenate to a single string
 * @param {String} [between=''] String to put between the values of `arr`. Defaults to an empty string
 * @returns {String}
 */
function strArrToStr(arr, between = '') {
	let str = '';
	arr.forEach((val, i) => {
		i >= arr.length - 1 ? (str += val) : (str += val + between);
	});
	return str;
}

/**
 * Like `String.split(splitVal)` but without transforming it to an Array.
 * @param {String} str String to split values off of.
 * @param {String} splitVal substring to split from `str`.
 * @param {...String} splitVals Further substrings to split from str
 */
function strSplitToStr(str, splitVal, ...splitVals) {
	splitVals.unshift(splitVal);
	splitVals.forEach((val) => {
		// console.log({ val, str });
		str = str.split(val);
		str = str.reduce((total, currentVal) => total + currentVal);
	});
	return str;
}

function strSplitToStrOnce(str, splitVal, ...splitVals) {
	splitVals.unshift(splitVal);
	for (let i = 0; i < str.length; i++) {
		for (let j = 0; j < splitVals.length; j++) {
			let len = splitVals[j].length;
			// console.log({ str: str.slice(i, i + len), i, j, splitVals });
			if (str.slice(i, i + len) === splitVals[j]) {
				splitVals[j] = splitVals[splitVals.length - 1];
				splitVals.pop();
				str = str.slice(0, i) + str.slice(i + len);
				j = 0;
				i--;
			}
		}
	}
	return str;
}

function strSplitToStrOnceRight(str, ...splitVals) {
	for (let i = str.length; i > 0; i--) {
		for (let j = 0; j < splitVals.length; j++) {
			let len = splitVals[j].length;
			// console.log({ str: str.slice(i, i + len), i, j, splitVals });
			if (str.slice(i - len, i) === splitVals[j]) {
				splitVals[j] = splitVals[splitVals.length - 1];
				splitVals.pop();
				str = str.slice(0, i - len) + str.slice(i);
				j = 0;
				i++;
			}
		}
	}
	return str;
}

/**
 * Like `string.split(splitVal)`, except only the first instance of splitVal is being splitted.
 * @param {String} str
 * @param {String} splitVal
 * @returns {String[]}
 */
function strSplitOnce(str, splitVal) {
	let len = splitVal.length;
	for (let i = 0; i < str.length; i++) {
		if (str.slice(i, i + len) === splitVal) return [str.slice(0, i), str.slice(i + len)];
	}
	return [str];
}

/**
 * Like `strSplitOnce`, but starting to look at the string from right to find the first occurance of `splitVal`
 * @param {String} str
 * @param {String} splitVal
 * @returns {String[]}
 */
function strSplitOnceRight(str, splitVal) {
	let len = splitVal.length;
	for (let i = str.length; i > 0; i--) {
		if (str.slice(i - len, i) === splitVal) return [str.slice(0, i - len), str.slice(i)];
	}
	return [str];
}

/**
 * Split a String with several splitting values and options associated to each of them.
 * ```
 * strSplit('<str>', '<splitThisValue>', ['<splitThisValueOnce>', true], ['<splitTheFirstOccuranceOfThisValueFromRight>', true, true])
 * ```
 * @param {String} str
 * @param  {...String} splitVals
 * @returns {String[]}
 */
function strSplit(str, ...splitVals) {}

function strSplitToStr(str, ...splitVals) {
	return strSplit(str, ...splitVals).reduce((acc, current) => (acc += current));
}

/**
 * Stringify & beautify a function. If beautification is unnecessary, use `func.toString()` instead.
 * @param {Function} func Function to stringify
 * @returns {String}
 */
function funcToStr(func) {
	func = func.toString();
	// TODO: Beautify func
}

/**
 * Turn a stringified JS Function into a valid JS Function.
 * @param {String} str String representation of a JS Function
 * @returns {Function}
 */
function strToFunc(str) {
	const arrowFunc = /([a-zA-Z]\w*|\([a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\)) => /; // TODO: Check if this works

	let params = [],
		body = null;

	if (arrowFunc.test(str)) {
		str = str.split(' => ');
		params = strSplitOnceRight(strSplitToStrOnce(strSplitToStr(str[0], ' '), '('), ')').split(',');
		body = str[1];
		if (body.startsWith('{')) body = strSplitToStr(body, '{', '}');
		else body = 'return (' + body + ')';
	} else {
		str = strSplitOnce(strSplitToStrOnce(str, 'function', '('), ')');
		params = str[0]
			.slice(1)
			.split(',')
			.map((val) => strToVal(val));
		body = strSplitOnceRight(strSplitOnce(str[1], '{'), '}');
	}

	params.push(body);
	return new Function(...params);
}

function fToFunc() {}

/**
 * Transforms stringified numbers to numbers and (stringified) percentages to decimals
 * @param {String} p The probability as a string either in percent or decimal format `"50%" == "0.5" == 0.5`
 * @return {Number} floating-point number representing the probability.
 */
function percentToDecimal({ k = 1, x = k, p = x }) {
	if (typeof p === 'string') {
		if (p.split('')[p.length - 1] === '%') p = Number(p.slice(0, -1)) / 100;
		p = Number(p);
	} else if (typeof p !== 'number') throw new TypeError('Invalid percent: the input "p" must be of the "number" data type');
	return p;
}
