module.exports = function(grunt) {
    'use strict';

    // Default task
    grunt.registerTask('config', function() {
        grunt.log.writeln(JSON.stringify(grunt.config()));
    });
};
