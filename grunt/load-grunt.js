// Deps
var path = require('path');
var _ = require('lodash');

module.exports = function(grunt, settings) {
    // variables
    var data = settings.default;
    var config = {};

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
            staticMappings: settings.mappings || {},
        },

        postProcess: settings.postProcess || _.noop(),
        preMerge: preMerge,
    };

    // Start our load-grunt-config
    require('load-grunt-config')(grunt, config);

    function preMerge(mConfig, options) {
        var tasks = Object.keys(mConfig);

        // Loop through our tasks to override existing configs
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var fileName = path.join(settings.override, task);

            if (grunt.file.isFile(fileName + '.js')) {
                grunt.verbose.subhead('[Task ' + task + ']');
                grunt.verbose.ok('Reading ' + fileName + '.js');
                mConfig[task] = require(fileName)(mConfig[task], options, grunt);
            }
        }
    }
};

function parse(args) {
    var options = {};
    _.forEach(args, function(arg) {
        var split = arg.split('=');
        options[split[0].replace(/^--/, '')] = split[1] || true;
    });

    return options;
}
