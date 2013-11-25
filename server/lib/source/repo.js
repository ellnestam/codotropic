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

    doIt : function() {

	return function(files) {
            var promises = [];
	
            for ( var i = 0; i < files.length; i++ ) {
		promises.push( repo.createRead( files[i] ) );
            }
	
	    q.all( promises ).then( function(results) {
		console.log(results + ' 222');
		var totalBytes = 0;
		for ( i = 0; i < results.length; i++ ) {
                    totalBytes += results[i].length;
		}
		console.log("Done reading files. totalBytes = " + totalBytes);
            }, function( error ) {
		console.log("Error reading files");
            });
	};
    }

    

};


module.exports = repo;