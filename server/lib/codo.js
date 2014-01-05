'use strict';

var fs = require('fs');
var q = require('q');
var copy = require('ncp');
var p = require('path');
var opt = require('optimist');

var repo = require('./source/repo.js');
var writer = require('./source/writer.js');
var textInfo = require('./source/data.js');

var codo = {
    
    launch : function launcher(args) {
	if (args.length < 5) {
	    console.log('');
	    console.log("  Usage: node codo.js [sourcedir] [outputdir] [filetype] --keep-hidden");
	    console.log('');
	    console.log("  By adding the --keep-hidden you do not skip directories that start with a dot. i.e .git, .subversion etc");
	    console.log('');
	} else {
	    var codoBinPath = args[1];
	    var dest = opt.argv._[1];
	    var sample_source = p.resolve(p.dirname(codoBinPath), '../../sample');

	    var setup = codo.setupDir(copy.ncp, sample_source, dest);

	    console.log('Working ...');

	    var keepHidden = (opt.argv['keep-hidden']) ? true : false;

	    setup.then(function() {
		var dirToRead = opt.argv._[0];
		var read = repo.scan(dirToRead, textInfo);
		read.then(codo.collect(p.join(dest, '/js/app/data.js'), opt.argv._[2], keepHidden), 
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
	    var promises = d;

	    var filtered = promises.filter(function(obj) {
		return obj.type === 'dir' || codo.endsWith(obj.file, suffix);
	    });

	    if (!keepHidden) {
		console.log('Removing dirs that starts with a dot. Disable this with --keep-hidden');
		filtered = filtered.filter(function(obj) {
		    return codo.notContains(obj.file, '/.')
		});
	    }

	    var nodes = {};
	    for (var i = 0; i < filtered.length; i++) {
		var item = filtered[i];
		var color = (item.type === 'dir') ? 'orange' : 'black';
		if (item.file.toLowerCase().indexOf('jquery') > 0) {
		    color = 'red';
		}
		nodes[item.file] = {file: item.file, type: item.type, parent: item.parent, info: item.info, color: color};
	    }

	    var amount = filtered.length;

	    writer.createDataFile(nodes, fileName);

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