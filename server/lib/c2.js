'use strict';

var fs = require('fs');
var q = require('q');

var repo = require('./source/repo.js');

var codo = {

    

    launch : function launcher() {
	var collect = function(data) {
	    
	    // console.log(codo.fileAsInfo(data[0], data[1]));
	    // console.log('Data: ' + data[0]);
	    //console.log('Filename: ' + data[0]);
	    console.log(data);
	}

	var readDir = repo.doIt('.');

	readDir.then(collect, this.error).done();
    },

    fileAsInfo : function (data, fileName) {
	var lines = data.toString().split('\n');
	var fi = {fileName : fileName,
		  lines : []
		 };
	for (var i = 0; i < lines.length; i++) {
	    fi.lines.push(codo.processLine(lines[i]));
	}
	
	return fi;
    },

    processLine : function processLine(data) {
	var regex = new RegExp("^\\s+");
	var result = data.match(regex);
	var numberOfWhitespace = 0;
	if (result !== null) {
	    numberOfWhitespace = result[0].length;
	}
	
	return [numberOfWhitespace, data.length - numberOfWhitespace];
    },
    
    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch();

module.exports = codo;