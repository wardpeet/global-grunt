module.exports = function(grunt) {
    // Default task
    grunt.registerTask('config', function() {
        grunt.log.writeln(JSON.stringify(grunt.config()));
    });
};
