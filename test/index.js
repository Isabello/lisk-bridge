/* jslint mocha:true, expr:true */

// Requires
const node = require('./node.js');

describe('Connectivity Testing', () => {
	// Describe function for DB query
	function queryDatabase(query) {
		node.dbQuery(query);
	}

	describe('Check Postgres', () => {
		it('using known query should be ok', (done) => {
			const queryBlocks = 'SELECT count(1) from blocks';
			queryDatabase(queryBlocks, (err, res) => {
				node.expect(res.rows[0].count).to.be.a.number;
			});
			done();
		});
	});
});
