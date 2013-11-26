'use strict';

var repo = require('../../lib/source/repo.js');
var q = require('q');

exports['Repo'] = {
    setUp: function(done) {
	done();
    },
    'Structure from name': function(test) {
	var readFile = repo.createRead('test/example.file');
	readFile.then(
	    function(data) {
		// console.log(data);
		test.done();
	    },
	    function(err) {
		console.error(err);
	    }
	);

	test.equals("de", "de");
    },

    'Read Dir' : function(test) {
	var readDir = repo.createProcessDir('.');
	var res = readDir.then( repo.doIt() );

	var result = q('');
	
	res.then(function(result) {
	    result.then(function(res) {
		console.log(res);
	    });
	});

	test.done();
    }

};
