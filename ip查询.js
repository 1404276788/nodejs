
var request = require("request");

//get请求
request('http://opendata.baidu.com/api.php?o=&resource_id=6006&t=1412300361645&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery1102026811896078288555_1412299994977&_=1412299994981&query=180.118.247.36', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the baidu homepage.
    }
});
