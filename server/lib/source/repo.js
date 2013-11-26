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

    doIt : function(collect) {
	return function(files) {
            var promises = [];

            for ( var i = 0; i < files.length; i++ ) {
		
		repo.createRead( files[i] ).then(
		    collect,
		    console.log
		);
            }
	
	    // Q.all(promises).then(console.log);

	    return promises;
	};
    }

    

};


module.exports = repo;