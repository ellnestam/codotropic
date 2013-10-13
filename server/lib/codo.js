'use strict';

var fs = require('fs');

var harvester = require('./source/harvester.js');

var codo = {

    serveResult : function(response) {
	return function printFetched(application) {
	    console.log('KESO');
	}
    },

    launch : function launcher(repo, returnResult, dir) {
	repo.gatherAll(dir);
	returnResult('ARNE')();

    }
}

var srv = codo.launch(harvester, codo.serveResult, ".");

module.exports = codo;