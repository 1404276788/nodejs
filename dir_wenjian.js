/**
 * 获取指定目录中的所有文件名
 */

let  fs = require('fs');
const path = require('path'); //系统路径模块



let url="C:/Users/Administrator/Desktop/url";//目录路径
let dirname=null;
// 读取目录
let fileNames=fs.readdirSync(url);

for(let i=0;i<fileNames.length;i++){
    dirname=fileNames[i];
    let a=url+"/"+dirname;
    console.log(a);

}

