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
    db: 'mongodb://bpc1985:hnh2812@ds053978.mongolab.com:53978/customer_registry',
    port: process.env.PORT || 80
  }
}
