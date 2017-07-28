const db = require('../db')

// Defines count query
const queryBlocks = 'SELECT count(1) from blocks';
const queryPgDatabase = 'select count(datname) from pg_database where datname = $1';

/// Gracefully close connections and exit
process.on('SIGTERM', () => {
	pool.end(() => {
	});
});

db.query(queryBlocks);
db.query(queryPgDatabase, [pool.database]);
