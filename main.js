var server = require('./server')
var router = require('./src/router')
var request = require('./server/request')

server.start(request.request, router.routers)
