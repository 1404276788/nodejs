//读取目录，可以查看目录中有哪些文件和文件夹
let fs=require('fs');
fs.readdir('./images',function(err,files){
	if(err){
		throw err;
	}
	//files是一个数组
	// 每个元素是此目录下的文件或文件夹的名称
	console.log(files);
})
