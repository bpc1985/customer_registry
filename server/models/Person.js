var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var personSchema = mongoose.Schema({
    pname: { type: String, require: true },
    title: String,
    telephone: String,
    mobile: String,
    street: String,
    zipcode: String,
    city: String,
    country: String,
    email: String,
    company: { type: ObjectId, default: null }
});

// Duplicate the ID field.
personSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
personSchema.set('toJSON', {
    virtuals: true
});

// To see virtuals in output when using console.log(obj)
personSchema.set('toObject', { virtuals: true })

var Person = mongoose.model('Person', personSchema);

exports.PersonSchema = personSchema;
exports.Person = Person;

