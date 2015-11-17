module.exports = function(grunt, settings) {
    // Deps
    var fs = require('fs');
    var path = require('path');
    var _ = require('lodash');

    // variables
    var data = settings.default;

    if (settings.setup) {
        if (typeof settings.setup === 'function') {
            data = settings.setup(data, parse(grunt.option.flags()));
        } else {
            grunt.log.fail('settings.setup should be a function');
        }
    }

    var config = {
        configPath: settings.grunt,
        data: data,
        jitGrunt: {
            customTasksDir: settings.tasks,
            staticMappings: settings.mappings || {},
        },

        postProcess: settings.postProcess || noop,
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

            if (fileExists(fileName + '.js')) {
                grunt.verbose.subhead('[Task ' + task + ']');
                grunt.verbose.ok('Reading ' + fileName + '.js');
                mConfig[task] = require(fileName)(mConfig[task], options);
            }
        }
    }

    function fileExists(filePath) {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    }

    function parse(args) {
        var options = {};
        _.forEach(args, function(arg) {
            var split = arg.split('=');
            options[split[0]] = split[1] || true;
        });

        return options;
    }

    function noop() {}
};
