lib_files = [
    //3rd Party Code
    'public/vendor/jquery/dist/jquery.min.js',
    'public/vendor/lodash/dist/lodash.min.js',
    'public/vendor/angular/angular.min.js',
    'public/vendor/angular-mocks/angular-mocks.js',
    'public/vendor/angular-route/angular-route.min.js',
    'public/vendor/angular-cookies/angular-cookies.min.js',
    'public/vendor/angular-resource/angular-resource.min.js',
    'public/vendor/restangular/dist/restangular.min.js',
    'public/vendor/toastr/toastr.min.js',
    'public/vendor/jasmine-jquery/lib/jasmine-jquery.js',
    {pattern: 'public/test/fixtures/**/*.json', watched: true, served: true, included: false}
]

cr_files = [
    //App-specific Code
    'public/app/app.js',
    'public/app/common/**/*.js',
    'public/app/**/*.js',
    //Test-Specific Code
    'public/test/unit/app.spec.js',
    //'public/test/unit/common/**/*.js',
    'public/test/unit/**/*.js',
]

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                basePath: '',
                frameworks: ['jasmine'],
                preprocessors: {
                },
                plugins: [
                    'karma-firefox-launcher',
                    'karma-chrome-launcher',
                    'karma-phantomjs-launcher',
                    'karma-jasmine'
                ],
                reporters: ['progress'],
                port: 9876,
                colors: true,
                logLevel: "INFO",
                autoWatch: true,
                captureTimeout: 60000,
                singleRun: false,
                autoWatch: true,
                browsers: ['PhantomJS']
            },
            crdev: {
                src: [
                ],
                files: lib_files.concat(cr_files),
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
};
