//创建目录
let fs=require('fs');
//创建images目录
fs.mkdir('./images',function(err){   //  ./代表当前目录，也可以省略
	if(err){
		throw err;
	}
	console.log('创建images目录成功');
})
