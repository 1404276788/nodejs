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
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'url'
});

connection.connect();  //开启会话

let url = "C:/Users/Administrator/Desktop/url";//目录路径

let fileNames = fs.readdirSync(url); //同步读取目录文件，返回数组
let dirname = [];
for (let i = 0; i < fileNames.length; i++) {
    dirname = fileNames[i];
    const dirdata = fs.readFileSync(url + "/" + dirname, 'utf-8');//需要写入数据库的文件
    let dirdata_arr = dirdata.split("\r\n");

    let from = "text1"; //表名
    for (let i = 0; i < dirdata_arr.length; i++) {
        let data = dirdata_arr[i];  //数据
        ins([data], from);
        //console.log(data);
    }
}




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





/**
 * 查询函数  
 *field 字段  string
 *from 表   string
 *where 查询条件    string
**/

// if(true){
//     let a=selectData(from,data,(res)=>{
//         console.log("结果：");
//         console.log(res.url);
//         return res.url;
//     })
//     console.log(a);
// }


connection.end();   //关闭会话

