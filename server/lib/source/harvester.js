var fs = require('fs');

var LOAN_DIR = 'loans/';

var repo = {

    gatherAll : function(dir, dataCallback, fileType) {
	repo.processDir(dir, dataCallback, fileType);
    },

    processDir : function(dir, dataCallback, fileType) {
	fs.readdir(dir, function (err, data) {
	    if (data) {
		for (var i = 0; i < data.length; i++) {
		    var fileOrDir = dir + '/' + data[i];
		    if (fileOrDir !== '.' && fileOrDir !== '..' && fs.existsSync(fileOrDir)) {
			var stat = fs.statSync(fileOrDir);
			if (stat.isDirectory() && !stat.isSymbolicLink()) {
			    repo.processDir(fileOrDir, dataCallback, fileType);
			} else if (stat.isFile() && 
				   !stat.isSymbolicLink() &&
				   repo.passes(fileOrDir, fileType)
				  ) {
	
			    repo.processFile(fileOrDir, dataCallback);
			}
		    }
		}
	    }
	});
    },

    passes : function(file, filter) {
	return file.substr(-filter.length) === filter;
    },

    processFile : function(file, callback) {
	fs.readFile(file, function read(err, data) {
	    var lines = data.toString().split('\n');
	    var fi = {fileName : file,
		      lines : []
		     };
	    for (var i = 0; i < lines.length; i++) {
		fi.lines.push(repo.processLine(lines[i]));
	    }
	    callback(fi);
	});
    },

    processLine : function processLine(data) {
	var regex = new RegExp("^\\s+");
	var result = data.match(regex);
	console.log(result[0].length);
	var numberOfWhitespace = 0;
	if (result !== null) {
	    numberOfWhitespace = result[0].length;
	}
	
	return [numberOfWhitespace, data.length - numberOfWhitespace];
    }
}
	
module.exports = repo;