/*
说明：将D:/安装包/CSV文件拆分/SplitCSVFile/abc/   目录下的csv文件同目录下转为txt文件
    dirname控制文件名
    u控制文件所在的文件夹路径

*/

const fs = require('fs');
const path = require('path'); //系统路径模块


let num= 92;
for (num; num <= 360; num++) {
    let dirname = "abc_"+num+".csv";//文件名  从第92个文件开始
    let u = "D:/安装包/CSV文件拆分/SplitCSVFile/abc/"; //路径
    let url = u + dirname;

    //数组处理，用来去除数组重复项，暂时没有用
    function unique(arr) {
        var newArr = [];   //当前定义一个空数组
        for (let i = 1; i < arr.length; i++) {  //根据指定数组的长度循环
            if (newArr.indexOf(arr[i]) == -1) {  //如果当前定义的数组中没有指定数组的中值（返回-1，找到就返回该值的下标）
                newArr.push(arr[i]);  //如果当前的数组中没有那个值，就将该值添加到当前指定的数组中
            }
        }
        return newArr;
    }

    //文件生成
    fs.readFile(url, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
        }
        else {
            let d = data.replace(/\"/g, "");  //去除字符串中的所有引号
            let arr = d.replace(/\r\n\r\n/g, "\r\n"); //两次换行替换为一次换行
            var file = path.join(u, dirname.slice(0, -4) + ".txt");   //新文件的保存路径，文件名
            fs.writeFile(file, arr, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('文件创建成功，地址：' + file);
            });
        }
    });

}



