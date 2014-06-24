var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var officeSchema = mongoose.Schema({
    office_name: String,
    company: { type: ObjectId, default: null },
    is_headoffice: { type: Boolean, default: null },
    responsible1: { type: ObjectId, default: null },
    responsible2: { type: ObjectId, default: null },
    open_times: String,
    visitable_location: { type: Boolean, default: null },
    street_address: String,
    zipcode: String,
    city: String,
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    b2bcustomerid: { type: ObjectId, default: null },
    locationchecked: Boolean
});

// Duplicate the ID field.
officeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
officeSchema.set('toJSON', {
    virtuals: true
});

// To see virtuals in output when using console.log(obj)
officeSchema.set('toObject', { virtuals: true })

var Office = mongoose.model('Office', officeSchema);

exports.OfficeSchema = officeSchema;
exports.Office = Office;
