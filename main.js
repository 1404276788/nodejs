let fs=require('fs');//载入node内置模块fs，该模块用于对系统文件及目录进行读写操作
fs.unlink('1.txt',function(err){
	if(err){
		throw err; 	//throw,用户自定义异常，当遇到异常，throw后面的语句不会执行，会输出throw提示异常的内容 err
	}
	console.log("1.txt 成功删除！");
})
