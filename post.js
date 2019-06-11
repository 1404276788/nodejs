const http = require('http')
const querystring = require('querystring')
var str = ''

http.createServer((req, res) => {
    //有段数据到达就触发（多次）
    req.on('data', data => {
      str += data
    })

    //数据全部到达触发（一次）
    req.on('end', () => {
      //console.log(str)
      var json = querystring.parse(str)
      console.log(json)
      
    })
  })
  .listen(3002)



