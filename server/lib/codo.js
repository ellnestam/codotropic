'use strict';

var fs = require('fs');

var harvester = require('./source/harvester.js');

var codo = {

    serveResult : function(info) {
	return function printFetched(application) {
	    
	}
    },

    launch : function launcher(harv, returnResult, args) {
	if (args.length < 4) {
	    console.log("Usage: node codo.js [sourcedir] [outputdir]");
	} else {
	    var dir = args[2];
	    var fi = function(info) {
		console.log(info);
	    };
	    harv.gatherAll(dir, fi, args[3]);
	}
	
	// returnResult('ARNE')();
    }
}

var srv = codo.launch(harvester, codo.serveResult, process.argv);

module.exports = codo;