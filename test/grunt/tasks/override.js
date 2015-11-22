module.exports = function(grunt) {
    'use strict';

    // Default task
    grunt.registerTask('override', function() {
        grunt.log.writeln(JSON.stringify(this.options()));
    });
};
