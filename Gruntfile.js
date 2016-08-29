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
        }
    });


    //
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    grunt.registerTask('build', ['ts']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};