'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');

var codo = {

    launch : function launcher() {
	var collect = function(data) {
	    console.log('Data: ');
	}

	var readDir = repo.createProcessDir('.');
	var res = readDir.then( 
	    repo.doIt(collect), 
	    this.error
	).done();


    },

    error : function error(e) {
	console.error('Error out: ' + error);
    }
}

var srv = codo.launch();

module.exports = codo;