var Company = require('mongoose').model('Company');

exports.getCompanies = function(req, res){
    Company.find({}).exec(function(err, collection){
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(collection);
    });
};

exports.getCompany = function(req, res){
    Company.findOne({_id:req.params.id}).exec(function(err, company){
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(company);
    });
};

exports.createCompany = function(req, res, next){
    var companyData = req.body;

    Company.create(companyData, function(err, company) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(company);
    });
};

exports.updateCompany = function(req, res){
    var _id = req.param('id');

    Company.findById(_id, function (err, company) {
        if (err) throw err;

        company.company_name = req.body.company_name;
        company.company_type = req.body.company_type;
        company.company_code = req.body.company_code;
        company.street = req.body.street;
        company.city = req.body.city;
        company.zip = req.body.zip;
        company.phone = req.body.phone;
        company.alt_phone = req.body.alt_phone;
        company.fax = req.body.fax;
        company.web_url = req.body.web_url;
        company.email = req.body.email;
        company.contact = req.body.contact;

        company.save(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send(company);
        });
    });
};

exports.deleteCompany = function(req, res){
    var _id = req.param('id');
    Company.findById(_id, function (err, company) {
        if (err) throw err;
        company.remove(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send('');
        });
    });
};
