var url = require('../../src/request').requestUrl
var operation = require('./operation').operation

function request (req, res) {

  var apiName = req.query.name
  var apiType = req.query.type
  var apiId = req.query.id

  for (var i = 0; i < url.length; ++i) {
    if (url[i].name === apiName) {
      var urlType = url[i].type
      for (var m = 0; m < urlType.length; ++m) {
        if (urlType[m].name === apiType) {
          var operationType = urlType[m].type
          switch (operationType) {
            case 'add':
              operation.add()
              break
            case 'delete':
              operation.delete()
              break
            case 'read':
              operation.read()
            case 'change':
              operation.change()
            default:
              console.log('err')
          }
          res.end()
          return
        }
      }
    }
  }
}

exports.request = request
