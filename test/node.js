'use strict';

// Root object
var node = {};

// Requires
node.pg = require('pg');
node.expect = require('chai').expect;
node.chai = require('chai');

const { Client } = node.pg;

node.client = new Client({
  user: '',
  host: 'localhost',
  database: 'lisk_main',
  password: 'password',
  port: 5432,
})

// Executes database query with passed query
node.dbQuery = function dbQuery(query) {
  node.client.query(query, (err, res) => {
    console.log(err ? err.stack : res.rows[0].count) // Returned count
    return res;
  });
}

// Exports
module.exports = node;
