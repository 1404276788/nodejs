
/**
 * 说明：
 * 文件对比，将目标文件（即需要与原来数据对比的文件）中的数据
 */

const fs=require('fs');
const path = require('path'); //系统路径模块


let filename=`源文件.txt`;//文件名
let filename1=`目标文件.txt`;//文件名
let urla='C:/Users/Administrator/Desktop/文件对比/';
let url='C:/Users/Administrator/Desktop/文件对比/'+filename;//源目录

console.log("处理文件："+url);

const data=fs.readFileSync(url,'utf-8');//读取文件内容，同步处理
//var outStr = data.replace(/:([0-9]+)/g, '');//字符串替换
let arr=data.split("\r\n");//字符串转数组，标识为换行符


let url1='C:/Users/Administrator/Desktop/文件对比/'+filename1;

console.log("处理文件："+url1);

const data1=fs.readFileSync(url1,'utf-8');
let arr1=data1.split("\r\n");

for(let i=0;i<arr1.length;i++){
    var a=arr.indexOf(arr1[i]);
    if(a==-1){
        //fs.writeFileSync(url2,str,{'flag':"w"});//将处理完的数据写入到文件中
        fs.writeFileSync(urla+'与源文件不同结果.txt',arr1[i]+'\r\n',{'flag':"a"});//将处理完的数据写入到文件中
    }
}


console.log(arr);