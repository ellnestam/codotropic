'use strict';

var repo = require('../../lib/source/repo.js');

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
	readDir.then( repo.doIt(), 
		      function(error) {
			  console.log(error);
		      }).done();
	test.done();
    }

};
