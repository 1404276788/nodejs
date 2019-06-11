let fs=require('fs');//引入文件目录操作模块
fs.readFile('123.txt',function(err,data){//读取失败信息，读取成功的数据
	//读取失败报错
	if(err){
		throw err;
	}
	//读取成功
	console.log(data.toString());
})
