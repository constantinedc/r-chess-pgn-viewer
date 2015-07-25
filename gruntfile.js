module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
      files: ["chrome/rchesspgn.js"],
      options : {
        globals: {
          jQuery : true
        }
      }
    },
    shell: {
      buildFirefox: {
        command: 'cd ffox && jpm run'
      }
    },
    watch: {
      files: ['chrome/*.js', 'chrome/*.css'],
      tasks: ['shell:buildFirefox']
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default", ["jshint"]);
}
