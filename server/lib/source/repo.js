'use strict';

var fs = require('fs');
var q = require('q');
var p = require('path');

var repo = {

    deferRead : function(filePath) {
	var deferred = q.defer();

	fs.readFile(filePath, "utf-8", function (error, text) {	    
	    if (error) {
		deferred.reject(new Error(error + '. Cannot read file: ' + filePath));
	    } else {
		deferred.resolve({'f' : filePath, 't' : text});
	    }
	});

	return deferred.promise;
    },

    scan : function (path) {
	return q.nfcall(fs.lstat, path).then(
	    function(stat) {
		if (stat.isDirectory()) {
		    var all = q.nfcall(fs.readdir, path);
		    return all.then(repo.readAll(path));
		} else {
		    return repo.deferRead(path);
		}
	    }
	);
    },

    readAll : function(path) {
	return function handleFiles(files) {
	    return q.all(files.map(repo.read(path))).then(
		function(results) {
		    return [].concat.apply([], results);
		}
	    );
	}	
    },
    
    read : function(path) {
	return function (file) {
	    return repo.scan(p.join(path, file));
	}
    },
};


module.exports = repo;