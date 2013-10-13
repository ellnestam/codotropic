var fs = require('fs');


var code = {

    fileToString : function(filename) {
	return fs.readFileSync(filename).toString();
    },

    parse : function(string) {
	return {
	    width : 2,
	    height : 2
	};
    },
    
    asText : function() {
	console.log("*****");
    }
}




module.exports = code;