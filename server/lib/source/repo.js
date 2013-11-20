'use strict';

var fs = require('fs');
var q = require('q');

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
    }
    

};


module.exports = repo;