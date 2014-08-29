var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

// get all users for API
exports.getUsers = function(req, res){
    User.find({}).exec(function(err, collection){
        res.send(collection);
    });
};

// get all user based on ID for API
exports.getUser = function(req, res){
    User.findOne({_id:req.params.id}).exec(function(err, user){
        if(err) { res.status(400); return res.send({reason:err.toString()}); }
        res.send(user);
    });
};

// create new user by post data to API
exports.createUser = function(req, res, next){
    var userData = req.body;
    userData.email = userData.email.trim();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

    User.create(userData, function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Email');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err) {
            if(err) { return next(err); }
            res.send(user);
        })
    });
};

// update user by put data to API
exports.updateUser = function(req, res, next){
    var userUpdates = req.body;
    var _id = req.param('id');

    User.findById(_id, function (err, user) {
        if (err) throw err;

        if(user.id != userUpdates.id) {
            res.status(403);
            return res.end();
        }

        user.firstName = userUpdates.firstName;
        user.lastName  = userUpdates.lastName;
        user.email     = userUpdates.email;
        user.company   = userUpdates.company;

        if(userUpdates.password && userUpdates.password.length > 0) {
            user.salt = encrypt.createSalt();
            user.hashed_pwd = encrypt.hashPwd(user.salt, userUpdates.password);
        }

        user.save(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send(user);
        });
    });
};
