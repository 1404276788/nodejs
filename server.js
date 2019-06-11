//创建web HTTP服务器
const http=require('http'); //http模块
const fs=require('fs');	//文件操作模块
const url=require('url');	//解析url模块


//创建服务器
http.createServer(function(request,response){ //请求数据，返回数据
	//解析请求，包括文件名
	let pathname=url.parse(request.url).pathname;
	//输出请求的文件名
	console.log("请求的文件名："+pathname);
	
	//从文件系统问读取请求的文件内容
	//substr()字符串抽取字符，substr(1)提取从第一个字符到后面的所有字符
	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			console.log(err);
			//http 状态码：   404：NOT FOUND
			 // Content Type: text/plain
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{
			// HTTP 状态码: 200 : OK
         	// Content Type: text/plain
         	//writeHead  数据响应
         	response.writeHead(200,{'Content-Type':'text/html'});
         	
         	//响应文件内容
         	response.write(data.toString());
		}
		//发送响应数据
		response.end();
	})
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');

