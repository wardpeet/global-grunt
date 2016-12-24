module.exports = function (grunt) {
    grunt.config('env', 'prod');

    // Default task
    grunt.registerTask('jit', function () {
        grunt.log.writeln(JSON.stringify(grunt.config()));
    });
};
