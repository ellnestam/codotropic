'use strict';

var fs = require('fs');
var q = require('q');
var p = require('path');

var repo = {

    createRead : function(fileName) {
	var deferred = q.defer();

	fs.readFile(fileName, "utf-8", function (error, text) {	    
	    if (error) {
		deferred.reject(new Error(error + '. Cannot read file: ' + fileName));
	    } else {
		if (fileName === undefined) {
		    console.log('KESO');
		}
		deferred.resolve({'f' : fileName, 't' : text});
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
		return q.all( files.map(function(filename) {
		    var path = dir + '/' + filename;
		    return deferred.resolve( repo.fileOrDir(path));
		})
			    )
	    }
	});

	return deferred.promise;
    },

    readDir : function (path) {
	return q.nfcall(fs.lstat, path).then(
	    function(stat) {
		if (stat.isDirectory()) {
		    return q.nfcall(fs.readdir, path).then(
			function handleFiles(files) {
			    return q.all(files.map(
				function(file) {
				    return repo.readDir(p.join(path, file));
				}
			    )).then(
				function(results) {
				    return [].concat.apply([], results);
				}
			    );
			}
		    );
		} else {
		    return repo.createRead(path);
		}
	    });
    },

    handleFiles : function (files) {
			    return q.all(files.map(
				function(file) {
				    return repo.readDir(p.join(path, file));
				}
			    )).then(
				function(results) {
				    return [].concat.apply([], results);
				}
			    );
    },


    fileOrDir : function(fileOrDir) {
	var fs_stat = q.nfbind(fs.lstat);

	var p = fs_stat(fileOrDir).then(function (data) {
	    if (data.isDirectory()) {
		return repo.createProcessDir(fileOrDir);
	    } else {
		return repo.createRead(fileOrDir);
	    }
	}, console.log);
	
	return p;
    },

    map : function (arr, iterator) {
	var promises = arr.map(function (element) {
	    return iterator(element) 
	});

	return q.all(promises);
    }	      
};


module.exports = repo;