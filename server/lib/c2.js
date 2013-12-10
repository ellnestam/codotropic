'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');
var data = require('./source/data.js');

var codo = {
    
    launch : function launcher() {
	var read = repo.readDir('./data');
	read.then(codo.collect, codo.error).done();
    },

    collect : function(d) {	    
	for (var i = 0; i < d.length; i++) {
	    console.log( data.dataAsInfo(d[i].t, d[i].f) ) ;
	}
    },
    
    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch();

module.exports = codo;