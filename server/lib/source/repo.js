'use strict';

var fs = require('fs');
var q = require('q');
var util = require('util');

var repo = {

    createRead : function(fileName) {
	var deferred = q.defer();
	fs.readFile(fileName, "utf-8", function (error, text) {	    
	    if (error) {
		deferred.reject(new Error(error));
	    } else {
		deferred.resolve(text);
	    }
	});

	return deferred.promise;
    },

    createProcessDir: function(dir) {
	var deferred = q.defer();
	fs.readdir(dir, function(error, data) {
	    if (error) {
		deffered.reject(new Error(error));
	    } else {
		deferred.resolve(data);
	    }
	});

	return deferred.promise;
    },


    statIt : function(fileOrDir) {
	var deferred = q.defer();
	fs.stat(fileOrDir, deferred.node());
	return defered.promise();
    },

    doIt : function(collect) {
	return function(files) {

            for ( var i = 0; i < files.length; i++ ) {
		// var stat = statIt(files[i]);

		var stat = fs.stat(files[i], function(err, stats) {
		    if (err) throw err;
		    console.log('Dir ' + stats.isDirectory());
		});
		console.log('Stat: ' + stat);
		// console.log(stat.isDir())
		

		repo.createRead(files[i]).then(collect, console.error);
            }
	};
    }

    

};


module.exports = repo;