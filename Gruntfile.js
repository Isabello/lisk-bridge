module.exports = function configureGrunt(grunt) {
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
		eslint: {
			target: ['test/**', '!test/mocha.opts', 'Gruntfile.js', 'index.js'],
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					quiet: false,
					clearRequireCache: false,
					noFail: false,
					timeout: '250s',
				},
				src: ['test'],
			},
		},
		markdown: {
			all: {
				files: [
					{
						expand: true,
						src: 'README.md',
						dest: '.',
						ext: '.html',
					},
				],
			},
		},
	});

	// Register tasks for travis.
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('eslint-fix', 'Run eslint and fix formatting', () => {
		grunt.config.set('eslint.options.fix', true);
		grunt.task.run('eslint');
	});
};
