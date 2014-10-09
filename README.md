[![Build Status](https://travis-ci.org/bboyle/grunt-codepainter.svg?branch=master)](https://travis-ci.org/bboyle/grunt-codepainter)
[![Dependency Status](https://david-dm.org/bboyle/grunt-codepainter.svg)](https://david-dm.org/bboyle/grunt-codepainter)
[![devDependency Status](https://david-dm.org/bboyle/grunt-codepainter/dev-status.svg)](https://david-dm.org/bboyle/grunt-codepainter#info=devDependencies)

[![NPM](https://nodei.co/npm/grunt-codepainter.png?compact=true)](https://nodei.co/npm/grunt-codepainter/)

# grunt-codepainter

> Grunt plugin for codepainter-A JavaScript beautifier that can both infer coding style and transform code to reflect that style.

## Codepainter

This repo is a grunt plugin for [codepainter][codepainter]. Visit the site to learn more about how codepainter works.
This readme will guide you through using codepainter in your grunt projects.

## Getting Started
This plugin requires Grunt `~0.4.2` and Node `0.10.6` (or newer).

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-codepainter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codepainter');
```

## The "codepainter" task

### Overview
In your project's Gruntfile, add a section named `codepainter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  codepainter: {
    // individual files
    static: {
      options: {
        predef: 'idiomatic',
        style: {
          indent_style: 'tab'
        }
      },
      files: {
        'dest/abc.js' : 'src/abc.js',
        'dest/xyz.js' : 'src/xyz.js',
      }
    },
  },
});
```

### Options

All values are optional.

Refer to [codepainter][codepainter] for details on how these options work.

#### options.infer
Type: `String`

Path to a javascript file to infer rules from.
Example: `'src/perfectlyStyledScript.js'`

#### options.predef
Type: `String`

Use one of the [codepainter][codepainter] presets: 'idiomatic', 'hautelook' or 'mediawiki'.

#### options.json
Type: `String`

Path to JSON configuration file containing style rules.
Example: `'.codepaintrc'`

#### options.style
Type: `Object`

Specify individual style rules to override the above.

#### options.editorConfig
Type: `Boolean`

Get styles from EditorConfig files. See [EditorConfig](http://editorconfig.org/) for details.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  codepainter: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to overwrite all script files in the src directory.

```js
grunt.initConfig({
  codepainter: {
    // directories
    dynamic: {
      options: {
        predef: 'idiomatic',
        style: {
          indent_style: 'tab'
        }
      },
      files: [{
        expand: true,       // Enable dynamic expansion
        cwd: 'src/',        // Src matches are relative to this path
        src: ['**/*.js'],   // Actual patterns to match
        dest: 'src/'        // Destination path prefix
      }]
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Thanks

- [@jedmao](https://github.com/jedmao) for [Codepainter]!
- [@dlukez](https://github.com/dlukez) for adding EditorConfig support to this plugin
- [@jeremyckahn](https://github.com/jeremyckahn) for adding support for user-defined rules


[Codepainter]: https://github.com/jedmao/codepainter
