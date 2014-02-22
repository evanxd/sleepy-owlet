'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    nodewebkit: {
      options: {
          build_dir: './nw-builds',
          mac: true,
          win: false,
          linux32: false,
          linux64: false
      },
      src: ['./index.html', './package.json', './js/**/*']
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('default', ['nodewebkit']);
};
