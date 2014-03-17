module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    mocha: {
      test: {
        src: ['tests/runner.html'],
        options: {
          run: true
        }
      },
    }
  });

  grunt.registerTask('default', ['mocha']);
};
