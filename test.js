String.prototype.splice = function (start, count, ...items) {
	const arr = Array.from(this);
	arr.splice(start, count, ...items);
	str = arr.reduce((total, val) => total + val);
	return str;
};

/** @param {String} str */
function createF(str) {
	const vars = new Set();
	const alphaRegex = /[a-z]/;
	let i = 0;
	while (i < str.length) {
		const char = str[i];
		if (char === ' ') {
			str = str.splice(i, 1);
			continue;
		} else if (alphaRegex.test(char)) {
			vars.add(char);
			if (i !== 0 && alphaRegex.test(str[i - 1])) {
				str = str.splice(i - 1, 0, '*');
				i++;
			}
		} else {
			console.log({ char });
			switch (char) {
				// POWERS:
				case '^':
					const startIndex = (() => {
						let j = i - 1;
						while (!isNaN(Number(str[j]))) j--; // if str[i]-1) is NaN, then it must be a single character variable, which will be returned
						return j;
					})();

					const endIndex = (() => {
						let j = i + 1;
						while (!isNaN(Number(str[j]))) j++;
						return j;
					})();

					const replacement = `Math.pow(${str.slice(startIndex, i)}, ${str.slice(i + 1, endIndex + 1)});`;

					console.log({ startIndex, endIndex, replacement, str });

					console.log('String before replacing power:', str);
					str = str.splice(startIndex, endIndex - startIndex, replacement);
					console.log('String after replacing power:', str);
					break;
			}
		}
		i++;
	}

	str = '; return ' + str;
	return new Function(...vars, str);
}

const test = 'm*x + c';

const f = createF(test);
console.log(f.toString());
f();
