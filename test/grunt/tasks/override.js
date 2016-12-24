module.exports = grunt => {
    // Default task
    grunt.registerTask('override', function () {
        grunt.log.writeln(JSON.stringify(this.options()));
    });
};
