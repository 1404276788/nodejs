
/**
 * 说明：
 * 读取目录中的文件，处理文件中的每个采集到的url，保留正确的url地址并过滤重复的数据，将过滤后的数据保存到指定目录中
 */

const fs=require('fs');
const path = require('path'); //系统路径模块

for(let i=246;i<=360;i++){
    let filename=`abc_${i}.txt`;//文件名
    let url1='D:/安装包/CSV文件拆分/SplitCSVFile/abc/'+filename;//源目录
    let url2='C:/Users/Administrator/Desktop/待采集/'+filename;//目标目录
    console.log("处理文件："+url1);

    const data=fs.readFileSync(url1,'utf-8');//读取文件内容，同步处理
    var outStr = data.replace(/:([0-9]+)/g, '');//字符串替换
    let arr=outStr.split("\r\n");//字符串转数组，标识为换行符

    function unique(arr){//数组去重
        var newArr = [];   //当前定义一个空数组
            for(var i=1;i<arr.length;i++){  //根据指定数组的长度循环,从数组中第二个元素开始去重，第一个元素本身就是唯一的
                if(newArr.indexOf(arr[i]) == -1){  //如果当前定义的数组中没有指定数组的中值（返回-1，找到就返回该值的下标）
                    let reg=/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
                        if(reg.test(arr[i])){//过滤非url的数据
                            newArr.push(arr[i]);  //如果当前的数组中没有那个值，就将该值添加到当前指定的数组中
                        }				
                    }
            }
        return newArr; 
        }
    let arr1=unique(arr);
    let str=arr1.join('\r\n');//数组转字符串，以换行分隔
    fs.writeFileSync(url2,str,{'flag':"w"});//将处理完的数据写入到文件中
    console.log("完成");
    console.log("路径："+url2);

}


// console.log(arr1);