'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');
var writer = require('./source/writer.js');
var textInfo = require('./source/data.js');

var codo = {
    
    launch : function launcher(args) {
	if (args.length < 4) {
	    console.log("Usage: node codo.js [sourcedir] [outputdir]");
	} else {
	    var dir = args[2];
	    var read = repo.scan(dir, textInfo);
	    read.then(codo.collect, codo.error).done();
	}
    },

    collect : function(d) {
	var promises = [].concat.apply([], d);
	var p2 = [].concat.apply([], promises);
	writer.createDataFile(d);
    },

    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch(process.argv);

module.exports = codo;