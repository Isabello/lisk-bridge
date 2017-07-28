const db = require('./db/index.js');
const AppConfig = require('./helpers/config.js');

// Initalizes paths
AppConfig.config();

// Setup GC
if (typeof gc !== 'undefined') {
	setInterval(function () {
		gc();
	}, 60000);
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
