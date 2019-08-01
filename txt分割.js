/**
 * 使用说明：该程序是用来分割文本文件的，根据行数来分割文件，并存放到指定的位置
 * 
 * {file}       string  要分割的文件路径
 * {row}        number  分割的行数
 * {dirname}    string  存放位置
 */

const fs = require('fs');
const readline = require('readline');

//要分割的文件路径
const file = `C:/Users/Administrator/Desktop/shell123.txt`;
const row=500; //控制文件行数
//const dirname='C:/Users/Administrator/Desktop/url/'; //分割的文件要写入到哪个文件夹中
const dirname='C:/Users/Administrator/Desktop/s1/'; //分割的文件要写入到哪个文件夹中



var i = 1;  //用于数据已经读取到第几行数据
let a=1;    //控制文件名
//用来存储结果的变量
//let arr = [];

//流的方式读取文件
var data = fs.createReadStream(file);

const r1 = readline.createInterface({   //逐行读取文件，缓存数据
    input: data
});


r1.on('line', (line) => {
    console.log(line);
    //arr.push(line);  //将数据存入到数组中，这个程序中暂时没有用到，而是将每次的数据追加写入到文件中 
    if(i%row==0){   //判断是否为100的倍数，如果是100的倍数，就是用变量a改变当前要写入的文件，实现每个文件100行数据
        a++;
        fs.writeFileSync(dirname+a+'.txt',line+'\r\n',{'flag':"a"});//将处理完的数据写入到文件中
    }else{
        fs.writeFileSync(dirname+a+'.txt',line+'\r\n',{'flag':"a"});//将处理完的数据写入到文件中
    }
    i += 1; //每读取一行 i+1
    
})