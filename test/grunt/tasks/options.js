module.exports = function(grunt) {
    'use strict';

    // Default task
    grunt.registerTask('options', function() {
        var data = {
            options: this.options(),
            config: grunt.config(),
        };

        grunt.log.writeln(JSON.stringify(data));
    });
};
