var auth = require('./auth'),
    users = require('../controllers/users'),
    companies = require('../controllers/companies'),
    persons = require('../controllers/persons'),
    offices = require('../controllers/offices'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app){
    app.get('/api/users', auth.requireRole('admin'), users.getUsers);
    app.get('/api/users/:id', users.getUser);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/companies', companies.getCompanies);
    app.post('/api/companies', companies.createCompany);
    app.get('/api/companies/:id', companies.getCompany);
    app.put('/api/companies/:id', companies.updateCompany);
    app.delete('/api/companies/:id', companies.deleteCompany);

    app.get('/api/offices', offices.getOffices);
    app.post('/api/offices', offices.createOffice);
    app.get('/api/offices/:id', offices.getOffice);
    app.put('/api/offices/:id', offices.updateOffice);
    app.delete('/api/offices/:id', offices.deleteOffice);

    app.get('/api/people', persons.getPeople);
    app.post('/api/people', persons.createPerson);
    app.get('/api/people/:id', persons.getPerson);
    app.put('/api/people/:id', persons.updatePerson);
    app.delete('/api/people/:id', persons.deletePerson);

    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params);
    });

    app.post('/forgot_password', users.forgotPassword);
    app.get('/reset/:token', users.resetPassword);
    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
