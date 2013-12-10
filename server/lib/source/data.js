'use strict';

var data = {

    dataAsInfo : function (d, fileName) {
	var lines = d.toString().split('\n');
	var fi = {fileName : fileName,
		  lines : []
		 };
	for (var i = 0; i < lines.length; i++) {
	    fi.lines.push(data.processLine(lines[i]));
	}
	
	return fi;
    },

    processLine : function (row) {
	var regex = new RegExp("^\\s+");
	var result = row.match(regex);
	var numberOfWhitespace = 0;
	if (result !== null) {
	    numberOfWhitespace = result[0].length;
	}
	
	return [numberOfWhitespace, row.length - numberOfWhitespace];
    },


};

module.exports = data;