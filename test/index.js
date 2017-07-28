/* jslint mocha:true, expr:true */

// Requires
const node = require('./node.js');

// Variables
const queryBlocks = 'SELECT count(1) from blocks';
const queryPgDatabase = 'select count(datname) from pg_database where datname = $1';

describe('Connectivity Testing', () => {

	// Describe function for querying Lisk app node
	function getNodeStatus(done) {
		node.get('/api/loader/status/sync', done);
	}

	describe('Check Postgres', () => {
		it('using pg_database table should be ok', (done) => {
			node.dbQuery(queryPgDatabase, ['lisk_main'], (err, res) => {
				node.expect(res.rows[0].count).to.equal(1);
				done();
			});
		});

		it('using count query against blocks should be ok', (done) => {
			node.dbQuery(queryBlocks, [], (err, res) => {
				node.expect(res.rows[0].count).to.be.a.number;
				done();
			});
		});
	});

	describe('Check Lisk', () => {
		it('using api/loader should be ok', (done) => {
			getNodeStatus((err, res) => {
				node.expect(res.body).to.have.property('success').to.be.ok;
				node.expect(res.body.height).to.be.above(1);
				done();
			});
		});
	});
});
