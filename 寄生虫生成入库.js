/*
说明：读取指定目录中的所有txt文件，将文件中的url写入到本地的数据库中
数据库名称：url
表名：text1
字段：id，url

表设计：设置url字段索引，保证插入数据唯一值


*/

const fs = require('fs');
const path = require('path'); //系统路径模块
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '192.168.1.105',
    user     : 'root',
    password : 'qqqAAA0130',
    database : 'shell_com'
});

connection.connect();  //开启会话

let url = "C:/Users/Administrator/Desktop/webshell地址"; //目录路径

let fileNames = fs.readdirSync(url); //同步读取目录文件，返回数组
let dirname = [];
for (let i = 0; i < fileNames.length; i++) {
    dirname = fileNames[i];
    const dirdata = fs.readFileSync(url + "/" + dirname, 'utf-8');//需要写入数据库的文件
    let dirdata_arr = dirdata.split("\r\n");

    let from = "webshell2019"; //表名
    for (let i = 0; i < dirdata_arr.length; i++) {
        let data = dirdata_arr[i];  //数据
        if(data){
            if(data.indexOf('http') > -1){               
                ins([data], from); 
            }else{
                ins(['http'+data], from);  
            }
            
        }        
        
    }
}



/*
    插入数据
    data 值  array
    from 表 string
*/

function ins(data,from) {
    let timestamp=(new Date()).valueOf();
    let sql = `INSERT INTO ${from} (url,time) VALUES('${data}','${timestamp}')`;
    //console.log(sql);
    connection.query(sql,function (err, result) {  //result为数组，元素以对象存储
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return 0;
        }
        //console.log(result);
        return result;
    })
}
/**
 * 查询语句
 * @param { string } tableName 表名
 * @param { Function } sucCallback 成功的回调方法
 * @param { Function } errCallback 失败的回调方法
 */
function selectData(tableName, condition, sucCallback, errCallback) {
    const sql = 'select * from ' + tableName + " where url=?";
    connection.query(sql, condition, (error, results, fields) => {
        if (error) {
            errCallback(error);
            return;
        }
        sucCallback(results[0]);
    });
}





connection.end();   //关闭会话

