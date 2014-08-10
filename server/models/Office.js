var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var officeSchema = mongoose.Schema({
    office_name:    { type: String, require: true },
    company:        { type: ObjectId, ref: 'Company', default: null },
    contact_persons: [{ type: ObjectId, ref: 'Person', default: null }],
    contact_info:   {
        street_address: { type: String, require: true },
        zipcode:        { type: String, require: true },
        city:           { type: String, require: true },
        country:        { type: String, require: false },
        phone:          { type: String, require: true },
        alt_phone:      { type: String, require: false },
        fax:            { type: String, require: false },
        email:          { type: String, require: false },
        website:        { type: String, require: false },
        coordinates: {
            latitude:  { type: Number, require: false },
            longitude: { type: Number, require: false }
        }
    },
    services:        [ { type: String } ],
    description:    {
        short_info: { type: String, require: true },
        long_info:  { type: String, require: false }
    },
    profile_img:    { type: String, require: false },
    is_headoffice:  { type: Boolean, default: null },
    show_office:    { type: Boolean, default: true },
    open_times: {
        weekdays: [
            {
                from:      { type: String },
                to:        { type: String },
                is_closed: { type: Boolean, default: false }
            }
        ],
        holiday: { type: String, require: false }
    },
    delivery_areas: [{ type: String }]
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
