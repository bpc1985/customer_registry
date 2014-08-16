var path = require('path');
var devPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/customer_registry',
    rootPath: devPath,
    port: process.env.PORT || 3030,
    host: process.env.HOST || 'localhost'
  },
  production: {
    db: 'mongodb://localhost/customer_registry',
    rootPath: '/home/flowebadm/customerRegistry',
    port: process.env.PORT || 80,
    host: process.env.HOST || 'api.ekukka.fi'
  }
}
