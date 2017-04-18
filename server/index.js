var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require("fs")
var multer  = require('multer')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: '/tmp/'}).array('image'))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function start (request) {

  // 主页输出 "Hello World"
  // app.get('/', function (req, res) {
  //   console.log("主页 GET 请求")
  //   res.send('Hello GET')
  // })
   
  // POST 请求
  // app.post('/', function (req, res) {
  //   console.log("主页 POST 请求")
  //   res.send('Hello POST')
  // })

  // get 请求的API
  app.get('/api', function (req, res) {
    request(req, res)
  })

  // 页面的路由请求
  // app.get('/', function (req, res) {
  //   if (req.query.tab === home) {
  //     // /tab/home/index
  //   }
  // })

  // app.get('/index.html', function (req, res) {
  //   res.sendFile( __dirname + "/" + "index.html" )
  // })

  // var router = {}
  // for (var i = 0; i < route.length; ++i) {
  //   router.home = route[i].path
  //   console.log('router: ', router)
  //   app.get(route[i].path, function (req, res) {
  //     console.log('route[i].templateUrl: ', router.home)
  //     // res.sendFile(__dirname + "/" + route[i].templateUrl)
  //     res.send('首页')
  //   })
  //   console.log('外面的i: ', i)
  // }
  // 这个方法存在一个问题，就是外面的循环不能进到get里面，i是循环之后的结果，导致里面获取html地址出错
  // 对象的取值方法是真的傻逼
  // 真的是想不到其他的方法了，我是真的干了

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

  // 页面路由跳转
  app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" )
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