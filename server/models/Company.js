var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var companySchema = mongoose.Schema({
    company_name: String,
    company_type: { type: String, enum: ['OY','KY','AY','OK','TN','KO','YH'], required: true },
    company_code: { type: String, required: true },
    phone: String,
    alt_phone: String,
    fax: String,
    web_url: String,
    email: String,
    contact1: { type: ObjectId, default: null },
    contact2: { type: ObjectId, default: null },
    contact3: { type: ObjectId, default: null },
    newsletter: Boolean,
    cnumber: Number,
    curl: String,
    responsible1: { type: ObjectId, default: null },
    responsible2: { type: ObjectId, default: null },
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

function createDefaultCompanies(){
    Company.find({}).exec(function(err, collection){
        if(collection.length === 0){
            Company.create({
                company_name: 'Floweb Oy',
                company_type: 'OY',
                company_code: '2485800-1',
                phone: '0504325549',
                alt_phone: '05043255491',
                fax: '1290381',
                web_url: 'http://www.ekukka.fi',
                email: 'info@ekukka.fi',
                contact1: null,
                contact2: null,
                contact3: null,
                newsletter: true,
                cnumber: 1,
                curl: '1',
                responsible1: null,
                responsible2: null
            });
        }
    });
}

exports.createDefaultCompanies = createDefaultCompanies;

exports.CompanySchema = companySchema;
exports.Company = Company;
