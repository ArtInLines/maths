const process = require('process');

const argTransEnum = require('./argTransEnum');
const validFuncs = Object.keys(argTransEnum);

function main() {
	let cliArgs = process.argv.slice(2);
	if (cliArgs.length <= 0) return noArgs();

	let func = cliArgs.shift();
	if (argTransEnum.hasOwnProperty(func)) func = argTransEnum[func];
	else return unknownFunc(func);

	const argObj = {};
	while (cliArgs.length > 0) {
		let arg = cliArgs.shift().split('=');
		argObj[arg[0]] = arg[1];
	}

	return func.call(null, argObj);
}

function noArgs() {
	throw new Error('');
}

function unknownFunc(name) {
	throw new Error('Unknown function name ' + name + '. Try instead one of these functions:', validFuncs);
}

console.log(main());
