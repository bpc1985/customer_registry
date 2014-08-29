var Person = require('mongoose').model('Person');
var Company = require('mongoose').model('Company');
var Office = require('mongoose').model('Office');
var User = require('mongoose').model('User');

var populateQuery = [
    { path:'company', select:'company_name company_type company_code phone email web_url' }
];

exports.getPeople = function(req, res){
    var queryObj = {};
    if (req.query.company){
        queryObj = { company: req.query.company.trim() };
    }
    else if (req.query.user){
        queryObj = { user: req.query.user.trim() };
    }
    else {
        queryObj = { company: null };
    }

    Person.find(queryObj).populate(populateQuery).exec(function(err, collection){
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(collection);
    });
};

exports.getPerson = function(req, res){
    Person.findOne({_id:req.params.id}).exec(function(err, person){
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(person);
    });
};

exports.createPerson = function(req, res, next){
    var personData = req.body;

    Person.create(personData, function(err, person) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(person);
    });
};

exports.updatePerson = function(req, res){
    var _id = req.param('id');

    Person.findById(_id, function (err, person) {
        if (err) throw err;

        person.pname = req.body.pname;
        person.title = req.body.title;
        person.telephone = req.body.telephone;
        person.mobile = req.body.mobile;
        person.street = req.body.street;
        person.zipcode = req.body.zipcode;
        person.city = req.body.city;
        person.country = req.body.country;
        person.email = req.body.email;
        person.company = req.body.company;

        person.save(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send(person);
        });
    });
};

exports.deletePerson = function(req, res){
    var _id = req.param('id');
    Person.findById(_id, function (err, person) {
        if (err) throw err;
        person.remove(function (err) {
            if(err) { res.status(400); return res.send({reason:err.toString()});}
            return res.send('');
        });
    });
};
