var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required'},
    lastName:  {type: String, required: '{PATH} is required'},
    email:     {type: String, required: '{PATH} is required', unique: true},
    salt: String,
    hashed_pwd: String,
    roles: [String],
    company: {type: ObjectId, ref: 'Company', default: null }
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

// To see virtuals in output when using console.log(obj)
userSchema.set('toObject', { virtuals: true })

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'hung');
            User.create({firstName: 'Hung', lastName:'Ho', email:'hung@test.com', salt: salt, hashed_pwd: hash, roles:['admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'test');
            User.create({firstName: 'test', lastName:'user', email:'test@test.com', salt: salt, hashed_pwd: hash, roles:[]});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
