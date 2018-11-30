module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      scripts: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/bootstrap/dist/js/bootstrap.js',
          'node_modules/underscore/underscore.js',
          'node_modules/backbone/backbone.js',
          'node_modules/handlebars/dist/handlebars.js',
          'node_modules/slick-carousel/slick/slick.js',
          'src/utils/TemplateLoader.js',
          'src/utils/handlebarHelpers.js',
          'src/index.js',
          'src/models/*.js',
          'src/collections/*.js',
          'src/views/*.js',
          'src/routes.js',
          'src/app.js',
        ],
        dest: 'build/<%= pkg.name %>.js',
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};