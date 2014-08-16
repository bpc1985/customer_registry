var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var companySchema = mongoose.Schema({
    company_name: String,
    company_type: { type: String, enum: ['TMI','KY','AY','OY','Osuuskunta','Oppilaitos','Muu'], required: true },
    company_code: { type: String, required: true },
    street: String,
    city: String,
    zip: String,
    phone: String,
    alt_phone: String,
    fax: String,
    web_url: String,
    email: String,
    contact: {type: ObjectId, ref: 'Person', default: null },
    user: {type: ObjectId, ref: 'User', default: null }
});

// Duplicate the ID field.
companySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
companySchema.set('toJSON', {
    virtuals: true
});

// To see virtuals in output when using console.log(obj)
companySchema.set('toObject', { virtuals: true })

var Company = mongoose.model('Company', companySchema);

exports.CompanySchema = companySchema;
exports.Company = Company;
