var express = require('express');

// 自定义模块todoController
var todoController = require('./controller/todoController');

var app = express();

app.set('view engine','ejs');
// body{ background: skyblue;color: #fff; padding: 30px;}
// h1{font-size: 48px; letter-spacing: 2px;text-align: center;}
// p{font-size: 16px; text-align: center;}
app.use(express.static('./public'));

todoController(app);

app.listen(5000);