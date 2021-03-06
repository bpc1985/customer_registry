var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');

module.exports = function(app, config){
    function compile(str, path){
        return stylus(str).set('filename', path);
    };

    app.configure(function(){
        app.set('views', config.rootPath + '/server/views');
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({secret: 'customer registry unicorns'}));
        app.use(passport.initialize());
        // using session
        app.use(passport.session());
        // config Stylus middleware
        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
        app.use(express.static(config.rootPath + '/public', { redirect : false })); // for favicon.ico, angularjs
    });
}
