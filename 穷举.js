/**
 * 列举字符串中所有字符组合的可能性
 *  */
function FStr(oStr,Num){ 
    for(var i=0 ;i<Math.pow(oStr.length,Num);i++){ 
        var x=i;
        var str=''; 
        var arr=[];         
        for(var j=0;j<Num;j++){ 
            let a=oStr.substr((x%oStr.length),1);                       
            x=parseInt(x/oStr.length) 
            arr.push(a);            
        } 
        str=arr.join('');
        console.log(str);
    } 
} 


let s='abc';    //需要的字符串
for(let i=1;i<=s.length;i++){
	FStr(s,i); 
}