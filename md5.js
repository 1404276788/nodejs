/**
 * 使用说明：该程序是用来分割文本文件的，根据行数来分割文件，并存放到指定的位置
 * 
 * {file}       string  要分割的文件路径
 * {row}        number  分割的行数
 * {dirname}    string  存放位置
 */

const fs = require('fs');
const readline = require('readline');
var md5 = require("md5");

//要分割的文件路径
const file = 'C:/Users/Administrator/Desktop/字典/somd5-xingming.txt';


var i = 1; //用于数据已经读取到第几行数据


//流的方式读取文件
var data = fs.createReadStream(file);

const r1 = readline.createInterface({ //逐行读取文件，缓存数据
    input: data
});

const val = '385a3e098cc03a5b3d87f3cabda1c6b8';

r1.on('line', (line) => {
    console.log('Line from file:' + i + ":" + line + "==>" + md5(line));
    //arr.push(line);  //将数据存入到数组中，这个程序中暂时没有用到，而是将每次的数据追加写入到文件中 
    let s = md5(line);
    if (s == val) {
        console.log(val + '的密码：' + line);
        process.exit(0);  //结束读取
    }


})
