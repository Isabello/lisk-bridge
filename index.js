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

// Executes database query with passed query
function dbQuery(query) {
	client.query(query, (err, res) => {
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
