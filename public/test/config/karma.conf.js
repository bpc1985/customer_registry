// Karma configuration
// Generated on Thu May 01 2014 18:45:44 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // 3rd Party Code
        '../../vendor/jquery/dist/jquery.min.js',
        '../../vendor/lodash/dist/lodash.min.js',
        '../../vendor/angular/angular.min.js',
        '../../vendor/angular-mocks/angular-mocks.js',
        '../../vendor/angular-route/angular-route.min.js',
        '../../vendor/angular-cookies/angular-cookies.min.js',
        '../../vendor/angular-resource/angular-resource.min.js',
        '../../vendor/restangular/dist/restangular.min.js',
        '../../vendor/toastr/toastr.min.js',

        // App-specific code
        '../../app/app.js',
        '../../app/common/**/*.js',
        '../../app/**/*.js',

        // Test-specific code
        '../unit/app.spec.js',
        '../unit/common/**/*.js',
        '../unit/**/*.js',
    ],

    plugins: [
        'karma-firefox-launcher',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher',
        'karma-jasmine'
    ],

    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
