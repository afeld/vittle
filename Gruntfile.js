module.exports = function(grunt) {

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: '../vittle.zip'
        },
        src: ['**/*', '!.git/', '!specs/', '!node_modules/', '*sublime-*']
      }
    },
    mocha: {
      all: ['specs/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-mocha');

  // Default task(s).
  grunt.registerTask('default', ['mocha']);

};
