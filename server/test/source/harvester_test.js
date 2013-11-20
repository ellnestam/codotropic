'use strict';

var harvester = require('../../lib/source/harvester.js');

exports['Harvester'] = {
    setUp: function(done) {
	done();
    },
    'Whitespace and length is processed': function(test) {
	var line = "        dede ded";
	var lineInfo = harvester.processLine(line);
	test.deepEqual([8, 8], lineInfo);
	test.done();
    },

    'Parent is added': function(test) {
	// var line = "        dede ded";
	// var lineInfo = harvester.processFile(line);
	// test.deepEqual([8, 8], lineInfo);
	test.done();
    },

};
