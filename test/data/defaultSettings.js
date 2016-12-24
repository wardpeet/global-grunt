const path = require('path');

module.exports = rootDir => ({
    grunt: path.join(rootDir, 'grunt/tasks/options'),
    tasks: path.join(rootDir, 'grunt/tasks'),
    override: path.join(rootDir, 'grunt/tasks/config'),

    jitGrunt: true,

    default: {
        env: 'test',
        src: 'src/',
        dist: 'dist/',
        version: '1.0'
    },

    setup: null
});
