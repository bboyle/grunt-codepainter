/*
 * grunt-codepainter
 * https://github.com/bboyle/grunt-codepainter
 *
 * Copyright (c) 2014 Ben Boyle
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('codepainter', 'Grunt plugin for codepainter-A JavaScript beautifier that can both infer coding style and transform code to reflect that style.', function() {
    // check files and options
    var fs = require('fs');
    var options = this.options();
    var style;

    if (options.json) {
      style = JSON.parse(fs.readFileSync(options.json));
    } else {
      style = options.style || {};
    }

    // async task
    var done = this.async();
    var totalFiles = this.files.length;
    var progress = {
      transformed: 0,
      skipped: 0,
      errored: 0
    };

    // track codepainter events
    var onTransform = function(transformed, path) {
      grunt.log.ok('codepainter', transformed, path);
    };
    var onError = function(err, inputPath) {
      grunt.log.error(err, inputPath);
    };
    var onEnd = function(err, transformed, skipped, errored) {
      var logType;
      progress.transformed += transformed;
      progress.skipped += skipped;
      progress.errored += errored;

      if ( progress.transformed + progress.skipped + progress.errored >= totalFiles ) {
        grunt.log[ errored ? 'error' : skipped ? 'warn' : 'ok' ]('Codepainter: ' +
          progress.transformed + ' transformed, ' +
          progress.skipped + ' skipped, ' +
          progress.errored + ' error' + (progress.errored === 1 ? '.' : 's.')
        );
        done();
      }
    };

    // setup transformer
    var Transformer = require('codepainter').Transformer;
    function getTransformer() {
      var transformer = new Transformer();

      transformer.on('transform', onTransform);
      transformer.on('error', onError);
      transformer.on('end', onEnd);

      return transformer;
    }

    // for each file
    this.files.forEach(function(file) {
      grunt.verbose.writeln('codepaint: transformer.transform '+file.src+' -> '+file.dest);
      // transform
      getTransformer().transform(
        file.src,
        {
          predef: options.predef,
          editorConfig: options.editorConfig,
          style: style,
          output: file.dest
        }
      );
    });
  });

};
