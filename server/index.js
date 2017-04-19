var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require("fs")
var multer  = require('multer')
var path = require('path')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: '/tmp/'}).array('image'))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function start (request, routers) {

  app.get('/tab/:key', function (req, res) {
    console.log('req: ', req.params)
    res.send('首页')
  })

  // get 请求的API
  app.get('/api', function (req, res) {
    request(req, res)
  })

  // 页面路由跳转
  for (var m = 0; m < routers.length; ++m) {
    app.get(routers[m].path, function (req, res) {
      for (var n = 0; n < routers.length; ++n) {
        if (req.path === routers[n].path) {
          // res.sendFile(path.resolve('src/pages/home/index.html'))
          res.sendFile(path.resolve('src/pages/' + routers[n].templateUrl))
          return
        }
      }
    })
  }

  // get提交表单
  app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
  })

  // post提交表单
  app.post('/process_post', urlencodedParser, function (req, res) {

    // 输出 JSON 格式
    response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
  })

  // 上传文件
  app.post('/file_upload', function (req, res) {

    // 上传的文件信息
    console.log('req.files[0]: ', req.files[0])
    var des_file = __dirname + "/" + req.files[0].originalname
    fs.readFile(req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err)
      } else {
        response = {
          message:'File uploaded successfully', 
          filename:req.files[0].originalname
        }
      }
      console.log('response: ', response)
      res.end(JSON.stringify(response))
      })
    })
  })

  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("连接上服务器")
  })
}

exports.start = start
