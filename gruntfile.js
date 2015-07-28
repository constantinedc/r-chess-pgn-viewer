module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      chrome: {
        files: [
          {expand: true, flatten: true, src: ['core/*'], dest: 'chrome/'},
          {expand: true, flatten: true, src: ['viewer/*'], dest: 'chrome/'},
        ]
      },
      firefox: {
        files: [
          {expand: true, flatten: true, src: ['core/*'], dest: 'firefox/data/'},
          {expand: true, flatten: true, src: ['viewer/*'], dest: 'firefox/data/'},
        ]
      }
    },

    watch: {
      chrome: {
        files: ['core/*', 'viewer/*'],
        tasks: ['copy:chrome']
      },
      firefox: {
        files: ['core/*', 'viewer/*'],
        tasks: ['copy:firefox']
      }
    },

    clean: {
      chrome: ["chrome/*", "!chrome/manifest.json"],
      firefox: ["firefox/data/*"]
    },

    jshint: {
      files: ["core/rchesspgn.js"],
      options : {
        globals: {
          jQuery : true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("default", ["copy"]);

  grunt.registerTask('chrome', ['copy:chrome', 'watch:chrome']);
  grunt.registerTask('firefox', ['copy:firefox', 'watch:firefox']);

  grunt.registerTask("package", ["jshint"]);//stub for other package tasks.
}
