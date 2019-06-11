/**
 * val  需要破解的md5密码
 *  */

const md5 =require("md5");
const s='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789.!@#$%^&*';

const val='437599f1ea3514f8969f161a6606ce18'; //需要破解的md5
let len=5;  //密码最短长度

function FStr(oStr,Num){ //穷举函数
    for(var i=0 ;i<Math.pow(oStr.length,Num);i++){ 
        var x=i;
        var str=''; 
        // var arr=[];         
        for(var j=0;j<Num;j++){ 
            let a=oStr.substr((x%oStr.length),1);                       
            x=parseInt(x/oStr.length) 
            str+=a;
            // arr.push(a);            
        } 
        // str=arr.join('');
        console.log(str);
        let mymd5=md5(str);
        if(mymd5==val){
            console.log(val+'的密码：'+str);
            return false;
        }
    } 
} 



for(;len<=s.length;len++){ //len控制密码长度    
    let a=FStr(s,len);
    if(a==false){
        return false;
    }
}