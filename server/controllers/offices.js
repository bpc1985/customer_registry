var Office = require('mongoose').model('Office');
var Company = require('mongoose').model('Company');

var populateQuery = [
    { path:'company', select:'company_name company_type company_code phone email web_url' },
    { path:'contact_persons', select:'pname title telephone mobile email' }
];

exports.getOffices = function(req, res){
    Office.find({}).populate(populateQuery).exec(function(err, collection){
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(collection);
    });
};

exports.getOffice = function(req, res){
    Office.findOne({_id:req.params.id}).populate(populateQuery).exec(function(err, office){
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(office);
    });
};

exports.createOffice = function(req, res){
    var officeData = req.body;

    Office.create(officeData, function(err, office) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(office);
    });
};

exports.updateOffice = function(req, res){
    var _id = req.param('id');

    Office.findById(_id, function (err, office) {
        if (err) throw err;

        office.office_name = req.body.office_name;
        office.company = req.body.company;
        office.contact_persons = req.body.contact_persons;
        office.contact_info = req.body.contact_info;
        office.services = req.body.services;
        office.description = req.body.description;
        office.profile_img = req.body.profile_img;
        office.is_headoffice = req.body.is_headoffice;
        office.profile_img = req.body.profile_img;
        office.show_office = req.body.show_office;
        office.open_times = req.body.open_times;
        office.delivery_areas = req.body.delivery_areas;

        office.save(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send(office);
        });
    });
};

exports.deleteOffice = function(req, res){
    var _id = req.param('id');
    Office.findById(_id, function (err, office) {
        if (err) throw err;
        office.remove(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send('');
        });
    });
};
