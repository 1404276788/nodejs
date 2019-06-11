/**
 * 使用说明：提取包含某字符串的整行数据
 * 
 * {file}       string  要分割的文件路径
 * {row}        number  分割的行数
 * {dirname}    string  存放位置
 */

const fs = require('fs');
const readline = require('readline');

//要分割的文件路径
const file = 'C:/Users/Administrator/Desktop/snsnb.com.access/snsnb.com-access_log_2019-06-02_013001.log';
const dirname='C:/Users/Administrator/Desktop/'; //过滤的内容要写入到哪个文件夹中

var i = 1; //用于数据已经读取到第几行数据


//流的方式读取文件
var data = fs.createReadStream(file);

const r1 = readline.createInterface({ //逐行读取文件，缓存数据
    input: data
});

const val = '385a3e098cc03a5b3d87f3cabda1c6b8';

r1.on('line', (line) => {
    console.log('Line from file:' + i + ":" + line);
    let str='admin.php';  //搜狐文章页地址中包含的格式
    //arr.push(line);  //将数据存入到数组中，这个程序中暂时没有用到，而是将每次的数据追加写入到文件中 
    let s = line.indexOf(str)!= -1;
    if (s) {
        fs.writeFileSync(dirname+'a1.txt',line+'\r\n',{'flag':"a"});//将处理完的数据写入到文件中
        // console.log(val + '的密码：' + line);
        //process.exit(0);  //结束读取
    }


})
