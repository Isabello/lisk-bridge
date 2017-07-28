const db = require('./db/index.js');
const fs = require('fs');
// const path = require('path');
const program = require('commander');

// Initalizes paths
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

// Defines count queries
const queryBlocks = 'SELECT count(1) from blocks';
// const queryPgDatabase = 'select count(datname) from pg_database where datname = $1';

function dbQuery(query, params) {
	return db.query(query, params, (err, res) => {
		if (err) {
			console.warn(err);
		}
		console.warn(res.rows[0].count);
	});
}

// Checking DB for blocks
dbQuery(queryBlocks, '');
setInterval(() => { dbQuery(queryBlocks, ''); }, 10000);


//  Gracefully close connections and exit
process.on('SIGTERM', () => {

});
