/* global process */
module.exports = function (grunt) {
    // Dependencies
    var path = require('path');

    // Directories
    var rootDir = process.cwd();

    var settings = require(path.join(rootDir, 'data/setupSettings'))(rootDir);

    // Start our grunt initialization of tasks and config
    require(path.join(rootDir, '../lib/load-grunt.js'))(grunt, settings);
};
