
// 引入mongoose模块
var mongoose = require('mongoose');

// 链接数据库
mongoose.connect('mongodb://jiang:Jzw151511@ds113482.mlab.com:13482/todoapp');

// 创建数据表
var todoSchema = new mongoose.Schema({
    // 键名：类型
    item:String,
    completed:Boolean
});

// 往数据库中存储数据
var Todo = mongoose.model('Todo',todoSchema);

// Todo({item:'Hello Everyone!'}).save(function (err,data) {
//     if (err) throw err;
//     console.log('Item saved');
// })

// 引入bodyParser模块
var bodyParser = require('body-parser');
// 对数据进行解析
var urlencodeParser = bodyParser.urlencoded({extended:false});

// var data = [
//     {item:"欢迎大家来到蓝鸥课堂!"},
//     {item:"希望大家能够喜欢我们的课程!"},
//     {item:"在课程中能够学到真实知识!"}
// ];

module.exports = function (app) {
    // 获取数据
    app.get('/todo',function (req,res) {
        Todo.find({},function (err,data) {
            if (err) throw err;

            res.render('todo',{todos:data});
        })
    });

    // 传递数据（拿到用户输入的被bodyparser解析的数据）
    app.post('/todo',urlencodeParser,function (req,res) {
        // data.push(req.body);
        // 拿到对应的数据req.body，使用save()存到数据库中
        Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
    });

    // 删除数据
    app.delete('/todo/:item',function (req,res) {
        // console.log(req.params.item);
        // data = data.filter(function (todo) {
        //     return req.params.item !== todo.item;
        // });
        //
        // res.json(data);

        // 查找当前数据库中有没有对应信息，找到后删除该数据
        Todo.find({item:req.params.item}).remove(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
        // data = data.filter(function (todo) {
        //     return req.params.item !== todo.item;
        // });
        //
        // res.json(data);
    });

    // 更新数据
    app.put('/todo/:item',function (req,res) {
        // console.log("更新成功");
        Todo.update({ item: req.params.item },{ completed: true },{ multi: true },function (err, data) {

            if (err) throw err;
            res.json(data);
        });
    });
}