// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express');
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express();
const fs=require('fs');
const url=require('url');
//url模块通过解析URL地址，get方式提交的数据可以通过该模块可以获得提交的数据
const http=require('http');

// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/', function (req, res) {	
	var queryObj = url.parse(req.url,true).query;
	var name = queryObj.name;
    var sex = queryObj.sex;
    var age = queryObj.age;
	let str="提交的数据为："+name+","+sex+","+age;
   	res.send(str);
 	
  
	fs.writeFile('from.txt',str,function(err){
		if(err){
			throw err;
		}
		console.log("写入成功！\n");
		console.log("试着读取文件的内容：");
		fs.readFile('from.txt','utf-8',function(err,data){
			if(err){
				throw err;
			}
			console.log(data);

		})
		
	});
	
  
});

// 定义好我们 app 的行为之后，让它监听本地的 3001 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(3001, function () {
  console.log('程序监听端口号：3001');
});