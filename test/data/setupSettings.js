module.exports = function (rootDir) {
    var path = require('path');

    return {
        grunt: path.join(rootDir, 'grunt/tasks/options'),
        tasks: path.join(rootDir, 'grunt/tasks'),
        override: path.join(rootDir, 'grunt/tasks/config'),

        default: {
            env: 'test',
            src: 'src/',
            dist: 'dist/',
            version: '1.0'
        },

        setup: function (config, flags) {
            config.env = flags.env;
            config.lint = flags.lint;
            config.minify = flags.minify || false;

            return config;
        }
    };
};
