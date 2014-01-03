'use strict';

var fs = require('fs');
var q = require('q');
var copy = require('ncp');
var p = require('path');

var repo = require('./source/repo.js');
var writer = require('./source/writer.js');
var textInfo = require('./source/data.js');

var codo = {
    
    launch : function launcher(args) {
	if (args.length < 4) {
	    console.log("Usage: node codo.js [sourcedir] [outputdir]");
	} else {
	    var codoBinPath = args[1];
	    var dest = args[3];
	    var sample_source = p.resolve(p.dirname(codoBinPath), '../../sample');
	    codo.setupDir(copy.ncp, sample_source, dest);

	    var dirToRead = args[2];
	    var read = repo.scan(dirToRead, textInfo);
	    read.then(codo.c2(p.join(dest, '/js/app/data.js')), codo.error).done();
	}
    },

    setupDir : function(cp, source, destination) {
	cp.limit = 16;
	cp(source, destination, function (err) {
	    if (err) {
		return console.error(err);
	    }
	    console.log('Source copied');
	});
    },

    c2 : function(fileName) {
	return function(d) {
	    var promises = [].concat.apply([], d);
	    var p2 = [].concat.apply([], promises);
	    writer.createDataFile(d, fileName);
	};
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