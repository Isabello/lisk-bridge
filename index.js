const { Client } = require('pg')

const client = new Client({
  user: '',
  host: 'localhost',
  database: 'lisk_main',
  password: 'password',
  port: 5432,
})

client.connect()

// Defines count query
var query = 'SELECT count(1) from blocks'

// Executes database query with passed query
function dbQuery(query) {
  client.query(query, (err, res) => {
    console.log(err ? err.stack : res.rows[0].count) // Returned count
  })
}

// Gracefully close connections and exit
process.on( 'SIGTERM', function () {
   client.end(function () {
     console.log("Closed DB connections");
     console.log("Exiting lisk-bridge");
   });
});

dbQuery(query);
