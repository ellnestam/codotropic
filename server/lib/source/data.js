'use strict';

var data = {

    toInfo : function (d, fileName) {
	var lines = d.toString().split('\n');
	var fi = {fileName : fileName,
		  lines : []
		 };
	for (var i = 0; i < lines.length; i++) {
	    fi.lines.push(data.processRow(lines[i]));
	}
	
	return fi;
    },

    processRow : function (row) {
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