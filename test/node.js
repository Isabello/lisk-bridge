// Root object
const node = {};

// Requires
node.db = require('../db/index.js');
node.expect = require('chai').expect;
node.chai = require('chai');
node.supertest = require('supertest');

// http configuration
node.baseUrl = 'http://localhost:8000'; // Make me abstract bitte
node.api = node.supertest(node.baseUrl);


// Configures supertest for querying Lisk
function abstractRequest(options, done) {
	const request = node.api[options.verb.toLowerCase()](options.path);

	request.set('Accept', 'application/json');
	request.expect('Content-Type', /json/);
	request.expect(200);

	if (options.params) {
		request.send(options.params);
	}

	if (done) {
		request.end((err, res) => {
			done(err, res);
		});
	}
	return request;
}

// Get the given path
node.get = function getRequest(path, done) {
	return abstractRequest({ verb: 'GET', path, params: null }, done);
};

// Executes database query with passed query
node.dbQuery = function dbQuery(query, params, done) {
	var query = node.db.query(query, params, (err, res) => {
		if (err) {
			done(err);
		}
	});
	console.warn('returning: ' + query)
	return query;
};

// Exports
module.exports = node;
