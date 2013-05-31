module.exports = function(grunt) {

  grunt.initConfig({
    mocha: {
      all: ['specs/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

  // Default task(s).
  grunt.registerTask('default', ['mocha']);

};
