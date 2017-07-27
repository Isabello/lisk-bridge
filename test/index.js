'use strict'; /*jslint mocha:true, expr:true */

// Requires
var node = require('./node.js');


describe('Connectivity Testing', function () {

  // Describe function for DB query
  function queryDatabase(query, done) {
    node.dbQuery(query)
  }

  describe('Check Postgres', function() {
    it('using known query should be ok', function(done) {
      var query = 'SELECT count(1) from blocks';
      queryDatabase(query, function(err, res) {
        node.expect(res.rows[0].count).to.be.a.number;
      });
      done();
    });
  });
});
