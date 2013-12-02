'use strict';

var fs = require('fs');
var q = require('q');
var util = require('util');

var repo = {

    createRead : function(fileName) {
	var deferred = q.defer();
	fs.readFile(fileName, "utf-8", function (error, text) {	    
	    if (error) {
		deferred.reject(new Error(error + '. Cannot read file: ' + fileName));
	    } else {
		deferred.resolve(text);
	    }
	});

	return deferred.promise;
    },

    createProcessDir: function(dir) {
	var deferred = q.defer();
	fs.readdir(dir, function(error, files) {
	    if (error) {
		deferred.reject(new Error('Cannot process dir: ' + dir + ' ' + error));
	    } else {
		deferred.resolve(files);
	    }
	});

	return deferred.promise;
    },

    map : function (arr, iterator) {
	var promises = arr.map(function (element) {
	    return iterator(element) 
	});

	return q.all(promises);
    },

    fileOrDir : function(fileOrDir) {
	var fs_stat = q.nfbind(fs.lstat);

	var p = fs_stat(fileOrDir).then(function (data) {
	    if (data.isDirectory()) {
		console.log('Dir: ' + fileOrDir);
		return repo.createProcessDir(fileOrDir);
	    } else {
		console.log('File: ' + fileOrDir);
		return repo.createRead(fileOrDir);
	    }
	}, console.log);
	
	return p;
    },

    doIt : function(dir) {
	var promises = [];

	fs.readdir(dir, function(error, files) {
	    if (error) {
		console.log(error);
	    }
	    promises.push( repo.map(files, repo.fileOrDir) );
	});
		   
	return q.all(promises);
    }
	      
};


module.exports = repo;