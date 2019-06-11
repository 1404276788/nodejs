/**
 * 将目录中的文件按行去重，每次目录中只能放一个文件去重
 * 需要去重的文件放在桌面【去重】的文件夹中
 * 完成去重的文件保存在桌面url的文件夹中，文件名为【已处理.txt】
 */
const fs=require('fs');
const path = require('path'); //系统路径模块

let url = "C:/Users/Administrator/Desktop/去重";//源路径
let url1 = "C:/Users/Administrator/Desktop/url/已处理.txt";//目录路径

let fileNames = fs.readdirSync(url); //同步读取目录文件，返回数组

let dirname = [];
let dirdata_arr=[];
for (let i = 0; i < 1; i++) {
    dirname = fileNames[i];
    const dirdata = fs.readFileSync(url + "/" + dirname, 'utf-8');
    dirdata_arr = dirdata.split("\r\n");
}

let arr1=unique(dirdata_arr);
let str=arr1.join('\r\n');//数组转字符串，以换行分隔
fs.writeFileSync(url1,str,{'flag':"w"});//将处理完的数据写入到文件中
console.log("完成");
console.log("路径："+url1);

function unique(arr){//数组去重
    var newArr = [];   //当前定义一个空数组
        for(var i=1;i<arr.length;i++){  //根据指定数组的长度循环,从数组中第二个元素开始去重，第一个元素本身就是唯一的
            if(newArr.indexOf(arr[i]) == -1){  //如果当前定义的数组中没有指定数组的中值（返回-1，找到就返回该值的下标）             
                newArr.push(arr[i]);  //如果当前的数组中没有那个值，就将该值添加到当前指定的数组中                
                }
        }
    return newArr; 
}

