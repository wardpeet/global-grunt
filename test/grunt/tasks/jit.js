module.exports = grunt => {
    grunt.config('env', 'prod');

    // Default task
    grunt.registerTask('jit', () => {
        grunt.log.writeln(JSON.stringify(grunt.config()));
    });
};
