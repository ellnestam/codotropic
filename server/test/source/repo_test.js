'use strict';

var repo = require('../../lib/source/repo.js');

exports['Repo'] = {
    setUp: function(done) {
	done();
    },
    'Structure from name': function(test) {
	var process = repo.createRead('lib/source/repo_test.js');
	process.done();
	test.done();
    },
};
