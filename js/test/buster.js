var config = module.exports;

config["browser tests"] = {
    environment: "browser",
    sources: ["js/**/*.js",
	      "modules/curl/src/curl/plugin/**/*.js"],
    tests: ["test/**/*.js"],
    resources: ["test-helpers/**/*.js"],
    libs: ["modules/curl/src/curl.js", "loaderconf.js"]
    // extensions: [require("buster-amd")]
};



