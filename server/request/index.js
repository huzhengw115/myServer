var urlRequest = require('../../src/request')

function request (req, res) {
  var url = urlRequest.requestUrl

  var apiName = req.query.name
  var apiType = req.query.type
  var apiId = req.query.id

  for (var i = 0; i < url.length; ++i) {
    if (url[i].name === apiName) {
      var urlType = url[i].type
      for (var m = 0; m < urlType.length; ++m) {
        if (urlType[m].name === apiType) {
          console.log(urlType[m].event)
          res.send('返回')
          return
        }
      }
    }
  }
}

exports.request = request
