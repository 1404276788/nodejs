/**
 * 百度搜索爬虫
 */
const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const iconv = require('iconv-lite');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'url'
});

connection.connect();  //开启会话


//过滤html标签
function strhtml(msg) {
    let str = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    str = str.replace(/[|]*\n/, '') //去除行尾空格
    str = str.replace(/&npsp;/ig, ''); //去掉npsp
    return str;
}
/**
 * 处理获取的url，保证url符合规范
 * @param {*} text 字符串
 */
function matchurl(text) {
    let reg = /(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/g;
    let s1 = text.match(reg)[0];
    //console.log(s1);
    return s1;
}

/**
 * 
 * @param {*} str 字符串
 * 对比采集的单条数据是否有价值，比如www.baidu.com的域名是没有价值的。
 */
function data_duibi(str) {
    //过滤存在下方数组中数据
    let arr = ["google.cn", "google.com.hk", "17173.com", "google.com", "it168.com", "baike.com", "55.la", "58.com", "52pojie.cn", "baixing.com", "etuan.com", "im286.com", "crsky.com", "hack44.cn", "arpun.com", "2cto.com", "weibo.com", "sendong.com", "seowhy.com", "tianya.cn", "csdn.ne", "admin5.com", "admin5.net", "soso.com", "163ym.com", "thinkphp.cn", "cnzz.cn", "zhubajie.com", "zzcodes.net", "soufun.com", "xinhuanet.com", "qq.com", "mycodes.net", "chinaz.com", "boxian.com", "baidu.com", "blogchina.com", "bokee.com", "dedewang.com", "focus.cn", "hc360.com", "hexun.com", "live.com", "macromedia.com", "paipai.com", "sina.com", "sina.com.cn", "sohu.com", "taobao.com", "www.w3.org", "yahoo.com", "yesky.com", "sky.cn", "360.cn", "baidu.com", "cnzz.com", "cctv.com", "126.com", "163.com", "tmall.com", "tudou.com", "youku.com", "56.com", "7k7k.com", "ctrip.com", "ourgame.com", "skycn.com", "douban.com", "555qipaiyouxi.com", "38k.com", "liebiao.com", "renren.com", "97wan.com", "4399.com", "chinaz.com", "pps.tv", "onlinedown.com", "onlinedown.net", "tianya.cn", "38k.com", "lefeng.com", "hao123.com", "jd.com", "2688.com", "51.la", "sdo.com", "chinabyte.com", "yx007.com", "adobe.com", "zol.com.cn", "127.0.0.1", "383k.com", "ifeng.com", "1688.com", "wwwinfo.cn", "www.iresearch.cn", "www.126disk.com", "dedecms.com", "www.phpcms.cn", "bbs.phpcms.cn", "www.dedecms.com"];

    for (let i = 0; i < arr.length; i++) {
        let a = arr[i];
        let t = str.indexOf(a);
        if (t != -1) {  //如果对比的数据在数组中，返回false
            return false;
        }
    }
    return str; //如果不在数组中，说明该条数据有效，返回该数据
}

/*
    插入数据
    data 值  array
    from 表 string
    ins([str],from)
*/

function ins(data,from){
    let sql=`INSERT INTO ${from}(url) VALUES(?)`;   
    connection.query(sql,data,function(err,result){  //result为数组，元素以对象存储
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return 0;
        }
        //console.log(result);
        return result;                
    })    
}

/**
 * 通过 GET 请求来读取要请求的网页数据的内容
 * @param {string} k 关键词
 * @param {number} n 页数
 */
function urlcaiji(k, n) {
    request('http://www.baidu.com/s?wd=' + k + '&pn=' + n + '&oq=' + k + "&ie=utf-8&usm=1", function (err, res, body) {
        if (err) {
            console.log(err);
        }
        try{
            let $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析,获取的页面数据转为jQuery对象
            let s = $('.result.c-container');
            //console.log(s);
            for (let i = 0; s.length > i; i++) {
                try {
                    let s1 = $('.result.c-container').eq(i).find('.f13').find('.c-showurl').html().trim();//获取文本，去除空格
                    let s2 = strhtml(s1);//html标签过滤       
                    let str1 = matchurl(s2);//url规范化
                    if (data_duibi(str1)) {                
                        console.log(str1);
                        writefile(str1+"\r\n"); //将数据写入到文件中
                        //ins([str1],"text1");  //将爬取到的数据写入数据库
                    }
                } catch (err) {
                    continue;
                }



            }

        }catch(err){
            urlcaiji(k, n);
        }
        
        

    });
}


/**
 * 
 * @param {string} filename 文件名
 * @param {string} str 要写入的数据 
 */
function writefile(str,filename="a_01.txt"){   
    let url_str='C:/Users/Administrator/Desktop/采集地址/'+filename;//目标目录
    fs.writeFileSync(url_str,str,{'flag':"a"});//将处理完的数据写入到文件中  文件中追加
}



const data=fs.readFileSync("C:/Users/Administrator/Desktop/关键词.txt",'utf-8');  //读取文件中的关键词
let arr=data.split("\r\n"); //读取的内容转换为数组
for(let i=0;i<arr.length;i++){
    let key = arr[i];
    if(key.trim().length>1){
        let k = encodeURIComponent(key);
        let n = 0; //默认值，表示第一页开始，不用修改     
        for (let j = 1; j <= 50; j++ , n = j * 10) {
            try {            
                urlcaiji(k, n);        
            } catch (err) {
                continue;
            }    
        }
    }
    

}






connection.end();   //关闭会话




