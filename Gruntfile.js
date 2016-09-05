module.exports = function(grunt) {

    // Project configuration.
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
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'build/index.js'
                        ],
                        filter: 'isFile',
                        rename: function () {
                            return 'dist/components.umd.js'
                        }
                    }
                ]
            }
        },
    });


    //
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    grunt.registerTask('build', ['ts']);
    grunt.registerTask('dist', ['build', 'copy:dist']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};