/**
 * 使用说明：该程序是用来分割文本文件的，根据行数来分割文件，并存放到指定的位置
 * 
 * {file}       string  要分割的文件路径
 * {row}        number  分割的行数
 * {dirname}    string  存放位置
 */

const fs = require('fs');
const readline = require('readline');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'url'
});

connection.connect();  //开启会话

//文件路径
const file = `C:/Users/Administrator/Desktop/url/1.txt`;
const from = "ceshi"; //表名
// const row=1000; //控制文件行数
//const dirname='C:/Users/Administrator/Desktop/url/'; //分割的文件要写入到哪个文件夹中
//const dirname='C:/Users/Administrator/Desktop/url/'; //分割的文件要写入到哪个文件夹中



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
    
    //arr.push(line);  //将数据存入到数组中，这个程序中暂时没有用到，而是将每次的数据追加写入到文件中 
    if(line){        
        let sql = `INSERT INTO ${from}(url) VALUES(?)`;
        connection.query(sql, [line], function (err, result) {  //result为数组，元素以对象存储
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return 0;
            }
            //console.log(result);
            console.log(line);
            
        })
    }    
    
})

/*
    插入数据
    data 值  array
    from 表 string
*/

function ins(data, from) {
    let sql = `INSERT INTO ${from}(url) VALUES(?)`;
    connection.query(sql, data, function (err, result) {  //result为数组，元素以对象存储
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return 0;
        }
        //console.log(result);
        
    })
}
connection.end();   //关闭会话