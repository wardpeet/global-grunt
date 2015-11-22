module.exports = function(grunt) {
    'use strict';

    // Default task
    grunt.registerTask('test', function() {
        grunt.log.writeln(JSON.stringify(this.options()));
    });
};
