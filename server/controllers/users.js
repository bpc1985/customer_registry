var User = require('mongoose').model('User'),
    //async = require('async'),
    //nodemailer = require('nodemailer'),
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

exports.forgotPassword = function(req, res, next){
    /*
    async.waterfall([
        function(done) {
            var token = encrypt.createSalt();
            done(err, token);
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if(err) {
                    if(err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate Email');
                    }
                    res.status(400);
                    return res.send({reason:err.toString()});
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: '!!! SENDGRID USERNAME !!!',
                    pass: '!!! SENDGRID PASSWORD !!!'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@floweb.fi',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        return res.send({reason:err.toString()});
    });
    */
};

exports.resetPassword = function(req, res, next){
    /*
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                    done(err, user);
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: '!!! YOUR SENDGRID USERNAME !!!',
                    pass: '!!! YOUR SENDGRID PASSWORD !!!'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function(err) {
        res.redirect('/');
    });
    */
};
