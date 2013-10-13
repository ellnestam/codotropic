'use strict';

var harvester = require('../../lib/source/harvester.js');

exports['Harvester'] = {
    setUp: function(done) {
	done();
    },
    'Whitespace and length is processed': function(test) {
	var line = "        dede ded";
	var lineInfo = [];
	harvester.processLine(line, lineInfo);
	test.equals([8, 16], lineInfo);
	test.done();
    },
};
