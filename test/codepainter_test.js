'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.codepainter = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  'static': function(test) {
    var fixtures = 'whitespace.js,idiomatic.js'.split(',');
    var actual, expected;

    test.expect(fixtures.length);

    for (var i = 0; i < fixtures.length; i++) {
      actual = grunt.file.read('tmp/'+fixtures[i]);
      expected = grunt.file.read('test/expected/'+fixtures[i]);
      test.equal(actual, expected, fixtures[i]+' wasn\'t processed properly by codepainter');
    }

    test.done();
  },

  dynamic: function(test) {
    var fixtures = 'whitespace.js,idiomatic.js'.split(',');
    var actual, expected;

    test.expect(fixtures.length);

    for (var i = 0; i < fixtures.length; i++) {
      actual = grunt.file.read('tmp/dynamic/'+fixtures[i]);
      expected = grunt.file.read('test/expected/'+fixtures[i]);
      test.equal(actual, expected, fixtures[i]+' wasn\'t processed properly by codepainter');
    }

    test.done();
  },

  editorConfig: function(test) {
    var fixtures = 'whitespace.js,idiomatic.js'.split(',');
    var actual, expected;

    test.expect(fixtures.length);

    for (var i = 0; i < fixtures.length; i++) {
      actual = grunt.file.read('tmp/editorconfig/'+fixtures[i]);
      expected = grunt.file.read('test/expected/'+fixtures[i]);
      test.equal(actual, expected, fixtures[i]+' wasn\'t processed properly by codepainter');
    }

    test.done();
  }
};
