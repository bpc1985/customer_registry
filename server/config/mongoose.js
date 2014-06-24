var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    companyModel = require('../models/Company'),
    personModel = require('../models/Person'),
    officeModel = require('../models/Office');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log("CustomerRegistry DB opened");
    });

    userModel.createDefaultUsers();
    companyModel.createDefaultCompanies();
};
