/* global process */
module.exports = function (grunt) {
    // Dependencies
    var path = require('path');

    // Directories
    var rootDir = process.cwd();

    var settings = {
        grunt: path.join(rootDir, 'grunt/tasks/options'),
        tasks: path.join(rootDir, 'grunt/tasks'),
        override: path.join(rootDir, 'grunt/tasks/config'),

        default: require(path.join(rootDir, 'grunt/defaultOptions'))(grunt),

        setup: null
    };

    // Start our grunt initialization of tasks and config
    require(path.join(rootDir, 'lib/load-grunt.js'))(grunt, settings);
};
