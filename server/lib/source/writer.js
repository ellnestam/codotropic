'use strict';

var fs = require('fs');

var writer = {

    createDataFile : function(input) {
	var data = 'define([], function() {\n';
	data += '\n';
	data += 'return data = {\n';
	data += 'edges:'
	data += JSON.stringify(input);
	data += '}\n});';
	
	fs.writeFile('data_t.js', data, function(err) {
	    if (err) {
		throw err;
	    } else {
		console.log('Written');
	    }
	});
    }
};


module.exports = writer;