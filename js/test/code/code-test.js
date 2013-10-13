var buster = require("buster");
var world = require("../../code/code");

buster.testCase("Code behavior", {

    setUp: function () {
        this.code = code;
    },

    "Parse returns width and height": function () {
	var field = this.code.parse("ww\nww");
        buster.assert.equals(field.width, 2);
        buster.assert.equals(field.height, 2);
    },

    "": function () {
	var text = this.code.fileToString('../world/test.field');
	buster.assert.equals(text, "wwwwww\nwwwwww");
    },

}