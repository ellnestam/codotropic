'use strict';

var writer = require('../../lib/source/writer.js');


exports['Repo'] = {
    setUp: function(done) {
	done();
    },

    'Write file' : function(test) {
	
	writer.createDataFile([{parent : 'keso'}]);

	test.done();
    }

};
