'use strict';

var fs = require('fs');
var q = require('q');
var copy = require('ncp');
var p = require('path');

var repo = require('./source/repo.js');
var writer = require('./source/writer.js');
var textInfo = require('./source/data.js');

var codo = {
    
    launch : function launcher(args) {
	if (args.length < 5) {
	    console.log("Usage: node codo.js [sourcedir] [outputdir] [filetype] --keep-hidden");
	    console.log("By adding the --keep-hidden you do not skip directories that start with a dot. i.e .git, .subversion etc");
	} else {
	    var codoBinPath = args[1];
	    var dest = args[3];
	    var sample_source = p.resolve(p.dirname(codoBinPath), '../../sample');

	    var setup = codo.setupDir(copy.ncp, sample_source, dest);

	    console.log('Working ...');
	    
	    var keepHidden = (args[5] !== undefined && args[5] === '--keep-hidden') || false;

	    setup.then(function() {
		var dirToRead = args[2];
		var read = repo.scan(dirToRead, textInfo);
		read.then(codo.collect(p.join(dest, '/js/app/data.js'), args[4], keepHidden), 
			  codo.error)
		    .done();
	    });
	}
    },

    setupDir : function(cp, source, destination) {
	var defered = q.defer();

	cp.limit = 16;	
	cp(source, destination, function (err) {
	    if (err) {
		defered.reject(new Error(err));
	    } else {
		defered.resolve('Source copied');
	    }
	});

	return defered.promise;
    },

    endsWith : function (str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },

    notContains : function (str, substring) {
	return str.indexOf(substring) === -1;
    },


    collect : function(fileName, suffix, keepHidden) {
	return function(d) {
	    var promises = [].concat.apply([], d);

	    var filtered = promises.filter(function(obj) {
		return obj.type === 'dir' || codo.endsWith(obj.file, suffix);
	    });

	    if (!keepHidden) {
		console.log('Removing dirs that starts with a dot');
		filtered = filtered.filter(function(obj) {
		    return codo.notContains(obj.file, '/.')
		});
	    }

	    writer.createDataFile(filtered, fileName);

	    var amount = filtered.length;
	    console.log('');
	    console.log('Found ' + amount + ' file(s)');

	    if (amount > 200) {
		console.log('');		
		console.log('Wooaaah! That is a lot of files, probably too many, both for you and the computer. May I suggest you choose a sub dir instead?');
		console.log('Anyway, the Codotropic files were still stored for you.');
		console.log('');
	    }
	};
    },

    error : function error(e) {
	console.error('Error out: ' + e);
    }
}

var srv = codo.launch(process.argv);

module.exports = codo;