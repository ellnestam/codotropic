'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');

var codo = {

    launch : function launcher() {

	var collect = function(data) {
	    console.log('Data: ' + data);
	}

	var readDir = repo.createProcessDir('.');
	var res = readDir.then( repo.doIt(collect) );
    }
}

var srv = codo.launch();

module.exports = codo;