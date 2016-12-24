/* global process */
// Dependencies
const path = require('path');

module.exports = grunt => {
    // Directories
    const rootDir = process.cwd();

    const settings = require(path.join(rootDir, 'data/defaultSettings'))(rootDir);

    // Start our grunt initialization of tasks and config
    require(path.join(rootDir, '../lib/load-grunt.js'))(grunt, settings);
};
