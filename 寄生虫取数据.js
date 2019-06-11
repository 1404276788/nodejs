/**
 * 从数据库中取数据
 * 读取本地url数据库，从表text1中取出字段url中的数据
 * 
 * 将取出的数据保存到桌面 【待采集】 文件夹中
 * 
 * 每次采集需要修改的内容：
 * limit 100000，1000   从第100000条开始，取10000条数据
 * 变量filename  文件名
 */


const fs=require('fs');
const path = require('path'); //系统路径模块
const mysql= require('mysql');

const connection = mysql.createConnection({
    host     : '192.168.1.105',
    user     : 'root',
    password : 'qqqAAA0130',
    database : 'shell_com'
});

connection.connect();  //开启会话

/**
 * 查询语句
 * @param { string } tableName 表名
 * @param { Function } sucCallback 成功的回调方法
 * @param { Function } errCallback 失败的回调方法
 */

function selectData(sucCallback, errCallback) {
    const sql = 'SELECT url FROM webshell2019 limit 60000,10000';  //从第多少条开始，取10000条数据
    connection.query(sql,(error, results, fields)=> {
        if (error) {
            errCallback(error);
            return;
        }
        sucCallback(results);
    });
}

/**
 * 查询函数  
 *field 字段  string
 *from 表   string
 *where 查询条件    string
**/

let filename="shell路径7.txt"; //文件名
let url='C:/Users/Administrator/Desktop/'+filename;//目标目录

let a=selectData((res)=>{
    //console.log("结果：");
    //console.log(typeof res);
    let arr=[];
    for(let i in res){       
        arr.push(res[i].url); //取对象的属性值
    }
    // console.log(arr);
    let str=arr.join('\r\n');//数组转字符串，以换行分隔
    fs.writeFileSync(url,str,{'flag':"w"});//将处理完的数据写入到文件中
    console.log("获取完成："+url);
})




//


connection.end();   //关闭会话



