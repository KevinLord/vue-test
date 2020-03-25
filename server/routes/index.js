var express = require('express');
var router = express.Router();
var connect = require('../db/sql.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  connect.query("select * from user", function (error, results, fields){
      res.json(results);
  })
});

router.get('/page1', function(req, res, next) {
  connect.query("select * from page1", function (error, results, fields){
    res.json(results);
  })
});
router.post("/page1", function (req, res, next) {
  var date=req.body.date;
  var name=req.body.name;
  var address=req.body.address;
  var event=req.body.event;
  console.log(req.body)
  connect.query("insert into page1(date,name,address,event) values('" +date+ "', '" +name+ "', '" +address+ "', '" +event+ "')", function (error, results, fields) {
    res.json(results);
  });
});
router.post('/changePage1', function (req, res, next) {
  var date=req.body.date;
  var name=req.body.name;
  var address=req.body.address;
  var event=req.body.event;
  var oldName=req.body.oldName;

  console.log(req.body)
  connect.query("update page1 SET date='" +date+ "',name='" +name+ "' ,address='" +address+ "' ,event='" +event+ "' WHERE name='" +oldName+ "' ", function (err, rows) {
  });
});
router.delete("/deletePage1",function(req,res,next){
  var name = req.body.name;
  console.log(req.body)
  connect.query("delete from page1 where name ='" +name+ "'" ,function(err,rows){
    if(err){
      console.log(err);
    }else {
      console.log("成功");
    }
  });
});

router.get("/addUser", function (req, res, next) {
  console.log("addUser")
});
router.post("/addUser", function (req, res, next) {
  var userName1=req.body.userName;
  var userPassword1=req.body.userPassword;
  connect.query("insert into user(userName,userPassword,authority) values('" +userName1+ "', '" +userPassword1+ "','user')", function (error, results, fields) {
    res.json(results);
  });
});

router.get('/log', function(req, res, next) {
  connect.query("select * from log", function (error, results, fields){
    res.json(results);
  })
});
router.post("/AddLog", function (req, res, next) {
  var date=req.body.date;
  var time=req.body.time;
  var user=req.body.userName;
  var event='登录';
  console.log(req.body)
  connect.query("insert into log(date,time,user,event) values('" +date+ "', '" +time+ "', '" +user+ "', '" +event+ "')", function (error, results, fields) {
    res.json(results);
  });
});

router.delete("/deleteLog",function(req,res,next){
  var user = req.body.user;
  var date = req.body.date;
  var time = req.body.time;
  var event = req.body.event;
  console.log(req.body)
  connect.query("delete from log where time ='" +time+ "'" ,function(err,rows){
    if(err){
      console.log(err);
    }else {
      console.log("成功");
    }
  });
});

router.delete("/deleteUser",function(req,res,next){
  var userName = req.body.userName;
  console.log(req.body)
  connect.query("delete from user where userName ='" +userName+ "'" ,function(err,rows){
    if(err){
      console.log(err);
    }else {
      console.log("成功");
    }
  });
});

router.post('/changePassword', function (req, res, next) {
  var userName = req.body.userName;
  var userPassword = req.body.newPassword;
  connect.query("update user SET userName='" +userName+ "',userPassword='" +userPassword+ "' WHERE userName='" +userName+ "' ", function (err, rows) {
  });
});

router.post('/authority', function (req, res, next) {
  console.log(req.body)
  var userName = req.body.userName;
  var authority = req.body.authority;
  connect.query("update user SET authority='" +authority+ "' WHERE userName='" +userName+ "' ", function (err, rows) {
  });
});

router.post('/pic', function (req, res, next) {
  console.log(req.body.id)
  console.log(req.body.file)
  var id = req.body.id
  var file = req.body.file
  connect.query("insert into pic(id,picData) values('" +id+ "', '" +file+ "')", function (err, rows) {
  });
});

router.get('/pic', function(req, res, next) {
  console.log(res)
  connect.query("select * from pic", function (error, results, fields){
    res.json("get:::"+results);
  })
});


module.exports = router;
