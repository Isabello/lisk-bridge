const { Client } = require('pg');

const client = new Client({
	user: '',
	host: 'localhost',
	database: 'lisk_main',
	password: 'password',
	port: 5432,
});

client.connect();

// Defines count query
const queryBlocks = 'SELECT count(1) from blocks';
const queryPgDatabase = 'select count(datname) from pg_database where datname = $1';

// Executes database query with passed query
function dbQuery(query, params) {
	client.query(query, params, (err, res) => {
		// console.log(err ? err.stack : res.rows[0].count); // Returned count
		console.warn(err ? err.stack : res.rows[0].count);
	});
}

// Gracefully close connections and exit
process.on('SIGTERM', () => {
	client.end(() => {
	});
});

dbQuery(queryBlocks);
dbQuery(queryPgDatabase, [client.database]);
