module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                tsconfig: true
            }
        },
        watch: {
            scripts: {
                files: [
                    'src/**/*.ts',
                    'spec/**/*.ts'
                ],
                tasks: ['ts']
            }
        },

        uglify: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: 'index.js',
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        cwd: 'build/src',
                        src: '**/*.js',
                        dest: 'dist/src'
                    }
                ]
            }
        }
    });

    //
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    grunt.registerTask('build', ['ts']);
    grunt.registerTask('dist', ['build', 'uglify:dist']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};