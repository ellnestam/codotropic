'use strict';

var fs = require('fs');

var writer = {

    createDataFile : function(input, file) {
	var data = 'define([], function() {\n';
	data += '\n';
	data += 'return data = {\n';
	data += 'edges:'
	data += JSON.stringify(input);
	data += '}\n});';
	
	fs.writeFile(file, data, function(err) {
	    if (err) {
		throw err;
	    } else {
		console.log('Codotropic view created. Have fun!');
	    }
	});
    }
};


module.exports = writer;