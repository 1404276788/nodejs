//同步写法
//读取文件中的内容,返回数组
const fs = require('fs'); // 引入fs模块
const data=fs.readFileSync("C:/Users/Administrator/Desktop/关键词.txt",'utf-8');

let arr=data.split("\r\n");

console.log(arr);