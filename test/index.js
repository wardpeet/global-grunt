#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var spawn = require('child_process').spawn;
var parseJson = require('./helpers/parseJson.js');

var taskCount = 3;
var rootDir = process.cwd();

if (typeof Promise !== 'function') {
    console.log('Promise is not available!');
}

exports.testBasic = function(test) {
    test.expect(6);

    var promise = spawnGrunt('GruntFile.js').then(function(response) {
        var data = parseJson(response);

        test.strictEqual(4 + taskCount, Object.keys(data).length, 'Options should contain 6 items');
        test.strictEqual('src/', data.src, 'Src should be src/');
        test.strictEqual('dist/', data.dist, 'Dist should be dist/');
        test.strictEqual('test', data.env, 'Environment should be test');
        test.strictEqual('1.0', data.version, 'Version should be 1.0');
        test.equal('object', typeof data.test, 'Test should be an object');

        test.done();
    });

    defaultFailTest(promise, test);
};

exports.testBasicSetup = function(test) {
    test.expect(8);

    var promise = spawnGrunt('GruntFile-setup.js', ['--env=preview', '--lint']).then(function(response) {
        var data = parseJson(response);

        test.strictEqual(6 + taskCount, Object.keys(data).length, 'Options should contain 8 items');
        test.strictEqual('src/', data.src, 'Src should be src/');
        test.strictEqual('dist/', data.dist, 'Dist should be dist/');
        test.strictEqual('preview', data.env, 'Environment should be preview');
        test.strictEqual('1.0', data.version, 'Version should be 1.0');
        test.equal(false, data.minify, 'Minify should be false');
        test.equal('object', typeof data.test, 'Test should be an object');
        test.ok(data.lint, 'Lint should be true');

        test.done();
    });

    defaultFailTest(promise, test);
};

exports.testOverride = function(test) {
    test.expect(4);

    var promise = spawnGrunt('GruntFile.js', [], 'override').then(function(response) {
        var data = parseJson(response);

        test.strictEqual(3, Object.keys(data).length, 'Options should contain 3 items');
        test.ok(data.a, 'A should be true');
        test.strictEqual(false, data.b, 'B should be false');
        test.strictEqual('ok', data.c, 'c should be "ok"');

        test.done();
    });

    defaultFailTest(promise, test);
};

exports.testPassesOptionsToOverride = function(test) {
    test.expect(3);

    var promise = spawnGrunt('GruntFile.js', [], 'options').then(function(response) {
        var data = parseJson(response);

        test.strictEqual(2, Object.keys(data).length, 'Data should contains options & config');
        test.strictEqual(Object.keys(data.options).length, Object.keys(data.config).length - taskCount, 'options & config should be the same size');

        delete data.config.options;
        delete data.config.override;
        delete data.config.test;

        test.ok(_.isEqual(data.options, data.config), 'options & config should be the same');

        test.done();
    });

    defaultFailTest(promise, test);
};

exports.testPassesOptionsInsideTasks = function(test) {
    test.expect(1);

    var promise = spawnGrunt('GruntFile.js', ['--env=preview'], 'jit').then(function(response) {
        var data = parseJson(response);

        test.strictEqual('prod', data.env);

        test.done();
    });

    defaultFailTest(promise, test);
};

function spawnGrunt(gruntFile, args, command) {
    args = args || [];
    command = command || 'config';

    var promise = new Promise(function(resolve, reject) {
        var grunt = spawn('grunt', _.union([command, '--gruntfile=' + path.join(rootDir, gruntFile)], args));
        var response = '';

        grunt.stdout.on('data', function(data) {
            response += data;
        });

        grunt.on('exit', function() {
            resolve(response);
        });

        grunt.on('error', function(error) {
            reject(response, error);
        });
    });

    return promise;
}

function defaultFailTest(promise, test) {
    promise.catch(function(response, error) {
        console.log('Response', response);
        console.log('error', error);

        test.done();
    });
}
