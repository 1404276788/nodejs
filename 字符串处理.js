/**
 * dede数据库图片替换语句
 */
const s1='cqce.com.cn'; //根域名，不带www
let s2=s1.replace(/\./g,'_');
let str=`update dede_archives SET dede_archives.litpic = REPLACE( dede_archives.litpic, '/uploads/', 'http://img.${s1}/${s2}/' ) 
where dede_archives.litpic like '/uploads/%';
update dede_addonarticle SET dede_addonarticle.body = REPLACE( dede_addonarticle.body, '/uploads/', 'http://img.${s1}/${s2}/' ) 
where dede_addonarticle.body like '%/uploads/%';
update dede_uploads SET dede_uploads.url = REPLACE( dede_uploads.url, '/uploads/', 'http://img.${s1}/${s2}/' ) 
where dede_uploads.url like '/uploads/%';`;

console.log(str);