'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');
var data = require('./source/data.js');
var writer = require('./source/writer.js');

var codo = {
    
    launch : function launcher(args) {
	if (args.length < 4) {
	    console.log("Usage: node codo.js [sourcedir] [outputdir]");
	} else {
	    var dir = args[2];
	    var fi = function(info) {
		console.log(info);
	    };
	    var read = repo.scan(dir);
	    read.then(codo.collect, codo.error).done();
	}
    },

    collect : function(d) {
	var promises = [].concat.apply([], d);
	var p2 = [].concat.apply([], promises);

	for (var i = 0; i < promises.length; i++) {
	    var p = promises[i];
	    d.info = data.toInfo(p.text);
	}

	writer.createDataFile(d);
    },

    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch(process.argv);

module.exports = codo;