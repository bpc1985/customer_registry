var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/customer_registry',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://bpc1985:hnh2812@ds063859.mongolab.com:63859/customer_registry',
    port: process.env.PORT || 80
  }
}
