var server = require('./server')
var router = require('./server/router')
var request = require('./server/request')

server.start(request.request, router.route)