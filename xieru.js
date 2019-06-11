let fs=require('fs');
//写入文件内容，如果文件不存在会创建文件
fs.writeFile('xieru.txt','我是被写入的内容',function(err){
	if(err){
		throw err;
	}
	console.log("写入成功！\n");
	console.log("试着读取文件的内容：");
	fs.readFile('xieru.txt','utf-8',function(err,data){
		if(err){
			throw err;
		}
		console.log(data);
	})
})
