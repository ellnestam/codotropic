'use strict';

var repo = require('../../lib/source/repo.js');

exports['Repo'] = {
    setUp: function(done) {
	done();
    },
    'Structure from name': function(test) {
	var process = repo.createRead('lib/source1/repo.js');
	process.then(
	    function(data) {
		console.log(data);
		test.done();
	    },
	    function(err) {
		console.error(err);
	    }
	);

	test.equals("de", "de");
    },
};
