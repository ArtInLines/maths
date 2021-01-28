const process = require('process');

const argTransEnum = {
	binomPDF: require('.'),
	binomCDF: require('.'),
};

function main() {
	let cliArgs = process.argv.slice(2);
	if (cliArgs.length <= 0) return noArgs();
}

function noArgs() {
	console.log();
}

/** @param {String[]} args */
function unknownArgs(args) {}

main();
