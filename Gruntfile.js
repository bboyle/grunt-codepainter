/*
 * grunt-codepainter
 * https://github.com/bboyle/grunt-codepainter
 *
 * Copyright (c) 2014 Ben Boyle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    codepainter: {
      // static: {                          // Target
      //   options: {                       // Target options
      //     optimizationLevel: 3
      //   },
      //   files: {                         // Dictionary of files
      //     'dist/img.png': 'src/img.png', // 'destination': 'source'
      //     'dist/img.jpg': 'src/img.jpg',
      //     'dist/img.gif': 'src/img.gif'
      //   }
      // },
      static: {
        options: {
          predef: 'idiomatic',
          style: {
            indent_style: 'tab'
          }
        },
        files: {
          'tmp/whitespace.js' : 'test/fixtures/whitespace.js',
          'tmp/idiomatic.js' : 'test/fixtures/idiomatic.js',
        }
      },
      // dynamic: {                         // Another target
      //   files: [{
      //     expand: true,                  // Enable dynamic expansion
      //     cwd: 'src/',                   // Src matches are relative to this path
      //     src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
      //     dest: 'dist/'                  // Destination path prefix
      //   }]
      // }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'codepainter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
