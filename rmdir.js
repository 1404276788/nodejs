let fs=require('fs');
fs.rmdir('newdir',function(err){
	if(err){
		throw err;
	}
	console.log('成功删除newdir目录');
})
