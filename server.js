var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

/////////////////////////// Database ////////////////////////////////
require('./server/config/mongoose')(config);

/////////////////////////// Passport ////////////////////////////////
require('./server/config/passport')();

/////////////////////////// Routes ////////////////////////////////
require('./server/config/routes')(app);

/////////////////////////// Port ////////////////////////////////
app.listen(config.port);
console.log("Listening on port " + config.port + '...');
