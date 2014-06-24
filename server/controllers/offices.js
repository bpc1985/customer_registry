var Office = require('mongoose').model('Office');

exports.getOffices = function(req, res){
    Office.find({}).exec(function(err, collection){
        if(err) { res.status(400); return res.send({reason:err.toString()});}
        res.send(collection);
    });
};

exports.getOffice = function(req, res){
    Office.findOne({_id:req.params.id}).exec(function(err, office){
        if(err) { res.status(400); return res.send({reason:err.toString()});}
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
        office.is_headoffice = req.body.is_headoffice;
        office.responsible1 = req.body.responsible1;
        office.responsible2 = req.body.responsible2;
        office.open_times = req.body.open_times;
        office.visitable_location = req.body.visitable_location;
        office.street_address = req.body.street_address;
        office.zipcode = req.body.zipcode;
        office.city = req.body.city;
        office.lat = req.body.lat;
        office.lng = req.body.lng;
        office.b2bcustomerid = req.body.b2bcustomerid;
        office.locationchecked = req.body.locationchecked;

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
