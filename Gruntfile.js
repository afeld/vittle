module.exports = function(grunt) {

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: '../vittle.zip'
        },
        src: [
          '**/*',
          '!.git/**/*',
          '!*.sublime-*',
          '!*.md',
          '!*.txt',
          '!bin/**/*',
          '!node_modules/**/*',
          '!specs/**/*'
        ]
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
