const fs = require('fs');
// const path = require('path');
const program = require('commander');

module.exports = {

	config: () => {
		program
			.version('0.1.0')
			.option('-s, --source <path>', 'Source install')
			.option('-t, --target <path>', 'Target install')
			.parse(process.argv);

		if (program.source) {
			console.warn(fs.existsSync(program.source));
		} else {
			console.warn('Source installation required');
			process.exit(2);
		}

		if (program.target) {
			console.warn(fs.existsSync(program.target));
		} else {
			console.warn('Target installation required');
			process.exit(2);
		}

	}
}
