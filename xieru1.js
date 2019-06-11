let fs=require('fs');
//向xieru.txt文件中追加内容，文件不存在会自动创建
fs.writeFile('xieru.txt','我是追加的内容。。。',{'flag':'a'},function(err){
	if(err){
		throw err;
	}
	console.log("内容追加成功！\n");
	console.log("试着读取文件的内容：");
	fs.readFile('xieru.txt','utf-8',function(err,data){
		if(err){
			throw err;
		}
		console.log(data);
	})
})
