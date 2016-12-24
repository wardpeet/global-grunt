
// Deps
const path = require('path');
const _ = require('lodash');

module.exports = (grunt, settings) => {
    // variables
    let data = settings.default;
    let config = {};

    if (settings.setup) {
        if (typeof settings.setup === 'function') {
            data = settings.setup(data, parse(grunt.option.flags()), grunt);
        } else {
            grunt.log.fail('settings.setup should be a function');
        }
    }

    config = {
        configPath: settings.grunt,
        data: data,
        jitGrunt: {
            customTasksDir: settings.tasks,
            staticMappings: settings.mappings || {}
        },
        init: false,

        postProcess: settings.postProcess || _.noop(),
        preMerge: preMerge
    };

    // Start our load-grunt-config
    const gruntConfig = require('load-grunt-config')(grunt, config);
    grunt.initConfig(gruntConfig);

    function preMerge(mConfig, options) {
        const tasks = Object.keys(mConfig);

        // Loop through our tasks to override existing configs
        for (let i = 0; i < tasks.length; i += 1) {
            const task = tasks[i];
            const fileName = path.join(settings.override, task);

            if (grunt.file.isFile(fileName + '.js')) {
                grunt.verbose.subhead('[Task ' + task + ']');
                grunt.verbose.ok('Reading ' + fileName + '.js');
                mConfig[task] = require(fileName)(mConfig[task], options, grunt);
            }
        }
    }
};

function parse(args) {
    let options = {};
    _.forEach(args, arg => {
        const split = arg.split('=');
        options[split[0].replace(/^--/, '')] = split[1] || true;
    });

    return options;
}
