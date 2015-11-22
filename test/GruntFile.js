/* global process */
module.exports = function(grunt) {
    // Time Grunt
    require('time-grunt')(grunt);

    // Dependencies
    var path = require('path');

    // Directories
    var rootDir = process.cwd();

    var settings = require(path.join(rootDir, 'data/defaultSettings'))(rootDir);

    // Start our grunt initialization of tasks and config
    require(path.join(rootDir, '../grunt/load-grunt.js'))(grunt, settings);
};
