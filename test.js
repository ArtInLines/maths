const t = require('./maths/util/transforms');

let f = function (n) {
	if (n <= 1) return 1;
	return n * f(n - 1);
};

f = t.funcToStr(f);

let tt = t.strToFunc(f);

console.log(tt(3));
