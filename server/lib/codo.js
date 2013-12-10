'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');
var data = require('./source/data.js');

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
	for (var i = 0; i < d.length; i++) {
	    console.log( data.toInfo(d[i].t, d[i].f) ) ;
	}
    },

    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch(process.argv);

module.exports = codo;