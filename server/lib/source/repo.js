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

    deferDir : function(path, data) {
	var d = q.defer();
	d.resolve({'f': path, 't': data});
	d.reject("What happened");
	return [d.promise];
    },

    scan : function (path) {
	return q.nfcall(fs.lstat, path).then(
	    function(stat) {
		if (stat.isDirectory()) {
		    var r2 = repo.deferDir(path, '');

		    var all = q.nfcall(fs.readdir, path);
		    var readAllPromises = repo.readAll(path);
		    var res = all.then(readAllPromises);
		    // console.log(res);
		    return q.all( res, r2 );
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