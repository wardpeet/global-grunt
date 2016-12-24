module.exports = grunt => {
    // Default task
    grunt.registerTask('options', function () {
        const data = {
            options: this.options(),
            config: grunt.config()
        };

        grunt.log.writeln(JSON.stringify(data));
    });
};
