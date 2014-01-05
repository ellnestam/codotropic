'use strict';

var fs = require('fs');
var q = require('q');
var p = require('path');

var repo = {

    deferRead : function(filePath, textInfo) {
	var deferred = q.defer();

	fs.readFile(filePath, "utf-8", function (error, text) {	    
	    if (error) {
		deferred.reject(new Error(error + '. Cannot read file: ' + filePath));
	    } else {
		deferred.resolve({'file' : filePath, 'type': 'file', 'parent': p.dirname(filePath), 'info': textInfo.toInfo(text)});
	    }
	});

	return deferred.promise;
    },

    deferDir : function(path, data) {
	var d = q.defer();
	d.resolve({'file': path, 'type': 'dir', 'parent': p.dirname(path), 'info' : {'lines' : [[0, 4]]}});
	d.reject("What happened!");
	return d.promise;
    },

    scan : function (path, textInfo) {
	return q.nfcall(fs.lstat, path).then(
	    function(stat) {
		if (stat.isDirectory()) {
		    var r2 = repo.deferDir(path, '');

		    var all = q.nfcall(fs.readdir, path);
		    var readAllPromises = repo.readAll(path, textInfo);
		    var res = all.then(readAllPromises);

		    return q.all([res, r2]).then(
			function(results) {
			    return [].concat.apply([], results);
			}
		    );

		} else {
		    return repo.deferRead(path, textInfo);
		}
	    }
	);
    },

    readAll : function(path, textInfo) {
	return function handleFiles(files) {
	    return q.all(files.map(repo.read(path, textInfo))).then(
		function(results) {
		    return [].concat.apply([], results);
		}
	    );
	}	
    },
    
    read : function(path, textInfo) {
	return function (file) {
	    return repo.scan(p.join(path, file), textInfo);
	}
    },
};


module.exports = repo;