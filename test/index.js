#!/usr/bin/env node

const _ = require('lodash');
const path = require('path');
const spawn = require('child_process').spawn;
const parseJson = require('./helpers/parseJson.js');

const taskCount = 3;
const rootDir = process.cwd();

exports.testBasic = test => {
    test.expect(6);

    const promise = spawnGrunt('GruntFile.js').then(response => {
        const data = parseJson(response);

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

exports.testBasicSetup = test => {
    test.expect(8);

    const promise = spawnGrunt('GruntFile-setup.js', ['--env=preview', '--lint']).then(response => {
        const data = parseJson(response);

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

exports.testOverride = test => {
    test.expect(4);

    const promise = spawnGrunt('GruntFile.js', [], 'override').then(response => {
        const data = parseJson(response);

        test.strictEqual(3, Object.keys(data).length, 'Options should contain 3 items');
        test.ok(data.a, 'A should be true');
        test.strictEqual(false, data.b, 'B should be false');
        test.strictEqual('ok', data.c, 'c should be "ok"');

        test.done();
    });

    defaultFailTest(promise, test);
};

exports.testPassesOptionsToOverride = test => {
    test.expect(3);

    const promise = spawnGrunt('GruntFile.js', [], 'options').then(response => {
        const data = parseJson(response);

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

exports.testPassesOptionsInsideTasks = test => {
    test.expect(1);

    const promise = spawnGrunt('GruntFile.js', ['--env=preview'], 'jit').then(response => {
        const data = parseJson(response);

        test.strictEqual('prod', data.env);

        test.done();
    });

    defaultFailTest(promise, test);
};

function spawnGrunt(gruntFile, args, command) {
    args = args || [];
    command = command || 'config';

    const promise = new Promise((resolve, reject) => {
        const grunt = spawn('grunt', [command, '--gruntfile=' + path.join(rootDir, 'test', gruntFile)].concat(args));
        let response = '';

        grunt.stdout.on('data', data => {
            response += data;
        });

        grunt.on('exit', () => {
            resolve(response);
        });

        grunt.on('error', error => {
            reject(response, error);
        });
    });

    return promise;
}

function defaultFailTest(promise, test) {
    promise.catch((response, error) => {
        console.log('Response', response);
        console.log('error', error);

        test.done();
    });
}
