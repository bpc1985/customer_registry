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

    if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.email = userUpdates.email;
    req.user.company = userUpdates.company;

    if(userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function(err) {
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(req.user);
    });
};
