'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');

var codo = {

    launch : function launcher() {
	var collect = function(data) {
	    console.log('Data: ' + data);
	}

	var readDir = repo.doIt('.');

	readDir.then(collect, this.error).done();
    },

    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch();

module.exports = codo;