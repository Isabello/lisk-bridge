const db = require('./db/index.js');

// Defines count query
const queryBlocks = 'SELECT count(1) from blocks';
const queryPgDatabase = 'select count(datname) from pg_database where datname = $1';


db.query(queryBlocks, '', (err, res) => {
	if (err) {
		console.warn(err);
	}
	console.warn(res);
});
db.query(queryPgDatabase, ['lisk_main']);

//  Gracefully close connections and exit
process.on('SIGTERM', () => {

});
