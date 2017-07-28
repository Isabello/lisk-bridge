/* jslint mocha:true, expr:true */

// Requires
const node = require('./node.js');

// Variables
const queryBlocks = 'SELECT count(1) from blocks';
const queryPgDatabase = 'select count(datname) from pg_database where datname = $1'

describe('Connectivity Testing', () => {
	// Describe function for DB query
	function queryDatabase(query, params) {
		node.dbQuery(query, params);
	}

	describe('Check Postgres', () => {

		it('using pg_database table should be ok', (done) => {
			queryDatabase(queryPgDatabase, node.client.database, (err, res) => {
				node.expect(res.rows[0].count).to.equal(1);
			});
			done();
		});

    it('using count query against blocks should be ok', (done) => {
      const queryBlocks = 'SELECT count(1) from blocks';
      queryDatabase(queryBlocks, [], (err, res) => {
        node.expect(res.rows[0].count).to.be.a.number;
      });
      done();
    });
	});
});
