const app = require('express')();
const server = require('http').createServer(app);
require('./socket')(server)
server.listen(3000);