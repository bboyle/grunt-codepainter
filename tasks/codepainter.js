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
    var done = this.async();
    var Transformer = require('codepainter').Transformer;
    var transformer = new Transformer();
    var options = this.options();

    transformer.on('transform', function(transformed, path) {
      grunt.log.ok(transformed, path);
    });
    transformer.on('error', function(err, inputPath) {
      grunt.log.error(err, inputPath);
    });
    transformer.on('end', function(err, transformed, skipped, errored) {
      grunt.log.writeln('Codepainter: ' +
        transformed + ' transformed, ' +
        skipped + ' skipped, ' + 
        errored + ' error' + ( errored === 1 ? '.' : 's.' )
      );
      done();
    });


    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      transformer.transform(
        file.src,
        {
          predef: options.predef,
          style: {
            indent_style: options.style.indent_style
          },
          output: file.dest
        }
      );
    });
  });

};
