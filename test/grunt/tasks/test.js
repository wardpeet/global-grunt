module.exports = function(grunt) {
    // Default task
    grunt.registerTask('test', function() {
        grunt.log.writeln(JSON.stringify(this.options()));
    });
};
