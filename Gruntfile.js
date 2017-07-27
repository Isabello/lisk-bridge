'use strict';

module.exports = function (grunt) {

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('gruntify-eslint');

    // Load Custom Tasks
    grunt.loadTasks('tasks');

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                process: function (src, filepath) {
                    if (filepath.substr(filepath.length - 2) === 'js') {
                        return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    } else {
                        return src;
                    }
                }
            },
        },
        eslint: {
          target: ['test/**', '!test/mocha.opts', 'Gruntfile.js', 'index.js']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false,
                    clearRequireCache: false,
                    noFail: false,
                    timeout: '250s'
                },
                src: ['test']
            }
        },
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: 'README.md',
                        dest: '.',
                        ext: '.html'
                    }
                ]
            }
        },
    });

    // Register tasks for travis.
    grunt.registerTask('test', ['eslint', 'mochaTest']);
};
