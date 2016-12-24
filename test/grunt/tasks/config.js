module.exports = grunt => {
    // Default task
    grunt.registerTask('config', () => {
        grunt.log.writeln(JSON.stringify(grunt.config()));
    });
};
