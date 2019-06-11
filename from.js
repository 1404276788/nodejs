var http = require("http");
var url = require("url");
let fs=require('fs');

var server = http.createServer(function(req,res){
    //得到查询部分，由于参数是true,得到的query是一个对象
    var queryObj = url.parse(req.url,true).query;
    var name = queryObj.name;
    var sex = queryObj.sex;
    var age = queryObj.age;
    let s=toString("提交的数据为："+name+","+sex+","+age);
    res.end(s);
    
});
server.listen(3000,"127.0.0.1");

//let str=server;
//fs.writeFile('from.txt',str,function(err){
//	if(err){
//		throw err;
//	}
//	console.log("写入成功！\n");
//	console.log("试着读取文件的内容：");
//	fs.readFile('from.txt','utf-8',function(err,data){
//		if(err){
//			throw err;
//		}
//		console.log(data);
//	})
//})
